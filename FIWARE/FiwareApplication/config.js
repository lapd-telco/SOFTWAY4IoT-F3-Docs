appconfig = {
	server: {
        host: '0.0.0.0',
        port: '5600'
	},
	orion: {
		host: '200.143.200.6',
		port: '8006'
	},
	devices:{
		ultrasonic: {
			id: 'sensor1s',
			attribute: 'distance'
		},
		servo: {
			id: 'servomotor',
			attribute: 'mover' //sufix _info
		}
	}
}

module.exports = appconfig;
