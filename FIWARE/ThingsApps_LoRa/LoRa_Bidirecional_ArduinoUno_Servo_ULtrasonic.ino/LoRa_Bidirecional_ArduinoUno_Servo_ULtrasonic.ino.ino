#include <SPI.h>
#include <Servo.h>
#include <LoRa.h>
#include <Ultrasonic.h>

unsigned long interval=10000; // the time we need to wait
unsigned long previousTime=0; 
unsigned int distance = 0;

//conexão dos pinos para o sensor ultrasonico
#define PIN_TRIGGER   4
#define PIN_ECHO      5

//Inicializa o sensor nos pinos definidos acima
Ultrasonic ultrasonic(PIN_TRIGGER, PIN_ECHO);

//Inicializa o servo no pino definido abaixo
Servo myservo;
static const int servoPin = 7;

void setup() {
  Serial.begin(9600);
  myservo.attach(servoPin);
  while (!Serial);

  Serial.println("LoRa Sender/Receiver");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  LoRa.setSpreadingFactor(12);
  LoRa.setSignalBandwidth(125E6);
}

int moveServo(){
  myservo.write(0);              
  delay(1000);
  myservo.write(180);             
  delay(1000);
  myservo.write(90);              
  delay(1000);
}

int getDistance()
{
    //faz a leitura das informacoes do sensor (em cm)
    int distanceCM;
    long microsec = ultrasonic.timing();
    // pode ser um float ex: 20,42 cm se declarar a var float 
    distanceCM = ultrasonic.convert(microsec, Ultrasonic::CM);
  
    return distanceCM;
}

void loop() {
  //try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");

    // read packet
    while (LoRa.available()) {
      Serial.print((char)LoRa.read());
    }

    // activate servo
    moveServo();
    // print RSSI of packet
    Serial.print("' with RSSI ");
    Serial.println(LoRa.packetRssi());
  }

  // get the atual time
  unsigned long currentTime = millis();
  
  if((currentTime-previousTime)>=interval){
    distance = getDistance();
    Serial.print("Distance: ");
    Serial.println(distance);
    // send packet
    LoRa.beginPacket();
    LoRa.print("05:01:distance:");
    LoRa.print(distance);
    LoRa.endPacket();
    previousTime = millis();

  }
  
}
