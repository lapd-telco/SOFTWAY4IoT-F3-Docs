const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); 
const config = require('../config');

//Default service and subservice for all devices
const fiwareServiceHeaders = {
	"Fiware-service": "sw4iotservice",
	"Fiware-servicePath": "/sw4iot"
}

//Configure a static server for the client files (front-end files)
app.use(express.static( path.join(__dirname + '/www' )));

//Send the www/ files to front-end
app.get('/', function (req, res) {
	res.sendFile( path.join( __dirname, 'www/'))
});

//Print id of Every socket created 
io.on('connection', function (socket) {
	console.log(`Socket conectado: ${socket.id}`)
});

//Obtain measurement result making a request to ORION
app.post('/measurementresult', function (req, res) {
    var requestOptions = {
        headers: fiwareServiceHeaders,
        url: 'http://' + config.orion.host + ':' + config.orion.port + '/v2/entities/urn:ngsi-ld:Thing:' + config.devices.ultrasonic.id + '/attrs/' + config.devices.ultrasonic.attribute + '?type=Thing&options=keyValues',
        method: 'GET'
	};
	//Make a HTTP GET request
	axios(requestOptions)
		.then(function (response) {
			//Print the ORION response in terminal
			console.log(response.data)
			//Send the response for all sockets connected
			io.sockets.emit('receiveMeasurementResult', response.data);		
		})
		.catch(function (error) {
			console.log(error)		
			//res.status(error.response.status).send(error.response.data);
		});
		//Send confirmation to ORION
		res.status(200).send();
}); 

//Obtain command result making a request to ORION
app.post('/commandresult', function (req, res) {
    var requestOptions = {
        headers: fiwareServiceHeaders,
        url: 'http://' + config.orion.host + ':' + config.orion.port + '/v2/entities/urn:ngsi-ld:Thing:' + config.devices.servo.id + '/attrs/' + config.devices.servo.command + '_info?type=Thing&options=keyValues',
        method: 'GET'
	};
	//Make a HTTP GET request
	axios(requestOptions)
		.then(function (response) {
			//Print the ORION response in terminal
			console.log(response.data);
			//Send the response for all sockets connected
			io.sockets.emit('receiveCommandResult', response.data);
			
		})
		.catch(function (error) {
			console.log(error)		
			//res.status(error.response.status).send(error.response.data);
		});
		//Send confirmation to ORION
		res.status(200).send();
}); 

//Send command request to ORION after the button click in front-end
app.post('/sendcommand', function (req, res) {
    var requestOptions = {
        headers: fiwareServiceHeaders,
        url: 'http://' + config.orion.host + ':' + config.orion.port + '/v1/updateContext',
		method: 'POST',
		data: {
			"contextElements": [
				{
					"type": "Thing",
					"isPattern": "false",
					"id": "urn:ngsi-ld:Thing:" + config.devices.servo.id,
					"attributes": [
						{
							"name": config.devices.servo.command,
							"type": "command",
							"value": ""
						}
					]
				}
			],
			"updateAction": "UPDATE"
		} 
	}
	
	axios(requestOptions)
		.then(function (response) {
			console.log(response.data.contextResponses);
			res.status(response.status).send(response.data.contextResponses[0].statusCode);
		})
		.catch(function (error) {
			console.log(error);		
			res.status(error.response.status).send(error.response.data);
		});
}); 

server.listen(config.server.port, config.server.host, function () {
	console.log('Fiware app listening at http://%s:%s', config.server.host, config.server.port);
});

