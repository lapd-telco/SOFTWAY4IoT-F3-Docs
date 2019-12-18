appconfig = {
	server: {
        host: '0.0.0.0', //Application IP
        port: '5600' //Application PORT
	},
	orion: {
		host: '200.129.207.169', //Orion Context Broker IP
		port: '1026' //ORION Context Broker PORT
	},
	devices:{
		ultrasonic: {
			id: 'sensor1s', //ID of the device (ultrasonic sensor) registered in WebSM
			attribute: 'distance' //Atributte of the sensor
		},
		servo: {
			id: 'servomotor', //ID of the device (servo motor) registered in WebSM
			command: 'mover' //Command of the actuator
		}
	}
}

module.exports = appconfig;
