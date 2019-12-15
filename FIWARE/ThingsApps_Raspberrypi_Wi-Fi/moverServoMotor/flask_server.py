from flask import Flask #Flask server 
from flask import jsonify #JSON parse
from moveServo import activateServo 

app = Flask(__name__)
raspberryIp = '0.0.0.0'

#The IoT Agent will make a HTTP POST for this endpoint
#The endpoint registered for the actuator device in WebSM
@app.route("/servoexemplo", methods=['POST'])
def commandExecution():
    #Function that activate the servo motor
    activateServo()
    #'mover' is the command name registered for the device
    #'Moved successfully!' is the command result sent to IoT Agent
    return jsonify({'mover': 'Moved successfully!'})

if __name__ == '__main__': app.run(debug=True, host=raspberryIp)
