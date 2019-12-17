appconfig = {
	server: {
        host: '0.0.0.0',
        port: '5600'
	},
	orion: {
		host: '200.129.207.169',
		port: '1026'
	},
	devices:{
		ultrasonic: {
			id: 'sensor1s', //id of the device (sensor) registered in WebSM
			attribute: 'distance' //atributte of the sensor
		},
		servo: {
			id: 'servomotor', //id of the device (actuator) registered in WebSM
			command: 'mover' //command of the actuator (sufix _info)
		}
	}
}

module.exports = appconfig;
