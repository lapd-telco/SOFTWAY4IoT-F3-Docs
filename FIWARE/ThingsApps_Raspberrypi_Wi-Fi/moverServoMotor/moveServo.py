import RPi.GPIO as GPIO  # Imports the standard Raspberry Pi GPIO library
from time import sleep   # Imports sleep (wait or pause) into the program

def activateServo():
    GPIO.setmode(GPIO.BOARD)  # Sets the pin numbering system to use the physical layout
    # Set up pin 3 for PWM
    GPIO.setup(3, GPIO.OUT)  # Sets up pin 3 to an output (instead of an input)
    p = GPIO.PWM(3, 50)     # Sets up pin 3 as a PWM pin

    p.start(0) # Starts running PWM on the pin and sets it to 0

    p.ChangeDutyCycle(7)  # turn towards 90 degree
    sleep(1)  # sleep 1 second
    p.ChangeDutyCycle(3)  # turn towards 0 degree
    sleep(1)  # sleep 1 second
    p.ChangeDutyCycle(12)  # turn towards 180 degree
    sleep(1)  # sleep 1 second
    # At the end of the program, stop the PWM
    p.stop()
    GPIO.cleanup()
