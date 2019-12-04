const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); 
const config = require('../config');

//Default headers for all devices
const fiwareServiceHeaders = {
	"Fiware-service": "sw4iotservice",
	"Fiware-servicePath": "/sw4iot"
}

//Configure a static server for the client files (front-end files)
app.use(express.static( path.join(__dirname + '/www' )));

app.get('/', function (req, res) {
	res.sendFile( path.join( __dirname, 'www/'))
});

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

	axios(requestOptions)
		.then(function (response) {	
			console.log(response.data)
			io.sockets.emit('receiveMeasurementResult', response.data);		
		})
		.catch(function (error) {
			console.log(error)		
			//res.status(error.response.status).send(error.response.data);
		});
		//Envia confirmação ao Orion
		res.status(200).send();
}); 

//Obtain command result making a request to ORION after receive a update notification from ORION
app.post('/commandresult', function (req, res) {
    var requestOptions = {
        headers: fiwareServiceHeaders,
        url: 'http://' + config.orion.host + ':' + config.orion.port + '/v2/entities/urn:ngsi-ld:Thing:' + config.devices.servo.id + '/attrs/' + config.devices.servo.command + '_info?type=Thing&options=keyValues',
        method: 'GET'
	};
	
	axios(requestOptions)
		.then(function (response) {	
			console.log(response.data);
			io.sockets.emit('receiveCommandResult', response.data);
			
		})
		.catch(function (error) {
			console.log(error)		
			//res.status(error.response.status).send(error.response.data);
		});
		//Envia confirmação ao Orion
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

