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
			id: 'sensor1s',
			attribute: 'distance'
		},
		servo: {
			id: 'servomotor',
			command: 'mover' //sufix _info
		}
	}
}

module.exports = appconfig;
