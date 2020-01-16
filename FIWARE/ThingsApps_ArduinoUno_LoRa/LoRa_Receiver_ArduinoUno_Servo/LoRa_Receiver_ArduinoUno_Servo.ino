#include <SPI.h>
#include <Servo.h>
#include <LoRa.h>

Servo myservo;
//board pin (arduinoUno)
static const int servoPin = 7;

void setup() {
  Serial.begin(9600);
  myservo.attach(servoPin);
  while (!Serial);

  Serial.println("LoRa Receiver");
  //Initiate LoRa in the band 915E6
  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  LoRa.setSpreadingFactor(12);
  LoRa.setSignalBandwidth(125E6);
}

int moveServo(){
  //move to 0 degrees
  myservo.write(0);              
  delay(1000);
  //move to 180 degrees
  myservo.write(180);             
  delay(1000);
  //move to 90 degrees
  myservo.write(90);              
  delay(1000);
}

void loop() {
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");

    // read packet
    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }
    //move servo motor
    moveServo();
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());
  }
}
