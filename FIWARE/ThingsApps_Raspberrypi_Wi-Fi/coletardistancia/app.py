import time #Time library of Python
from sendDistance import distance
import requests #Python lib for HTTP requests

if __name__ == '__main__':
    try:
        while True:
            #call the function that will activate the ultrasonic sensor
            dist = distance()
            #print distance colected on console
            print(dist)
            #Make an HTTP POST request for the IoT Agent south porth (7896)
            #This request will send the distance colected by the sensor 
            ioTAgentURL = 'http://10.16.0.243:7896/iot/json?i=sensor1&k=1234'
            #/iot/json Is the endpoint of the default service defined in the configuration file of the IoT Agent (config.js)
            #i parameter is the id of the device
            #k parameter is the API key defined in the IoT Agent configuration file (config.js)
            r = requests.post(ioTAgentURL, json={"distance": dist})
            #distance is the name of the sensor1 attribute that will be updated  
            #print HTTP status code returned by the IoT Agent (200 successfully updated)
            print(r.status_code)
            #suspend thread execution for one second
            time.sleep(1)

        # CTRL + C will stop the execution
    except KeyboardInterrupt:
        print("\nMeasurement stopped by User")

