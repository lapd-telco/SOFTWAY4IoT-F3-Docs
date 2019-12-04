#include <SPI.h>
#include <LoRa.h>
//biblioteca do sensor ultrassonico
#include <Ultrasonic.h>  
#define INTERVALO_LEITURA 10000 //(ms)
int counter = 0;

//variável responsável por armazenar a distância lida pelo sensor ultrassônico
unsigned int distance = 0;

//conexão dos pinos para o sensor ultrasonico
#define PIN_TRIGGER   4
#define PIN_ECHO      5

//Inicializa o sensor nos pinos definidos acima
Ultrasonic ultrasonic(PIN_TRIGGER, PIN_ECHO);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Sender");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  LoRa.setSpreadingFactor(12);
  LoRa.setSignalBandwidth(125E6);
}

int getDistance()
{
    int distanceCM;
    //obtem a leitura sensor em microsegundos
    long microsec = ultrasonic.timing();
    // convert the timming em cm
    distanceCM = ultrasonic.convert(microsec, Ultrasonic::CM);
  
    return distanceCM;
}

void loop() {
  Serial.print("Sending packet: ");
  Serial.println(counter);

  distance = getDistance();
  // send packet
  LoRa.beginPacket();
  LoRa.print("05:01:distance:");
  LoRa.print(distance);
  LoRa.endPacket();

  counter++;

  delay(INTERVALO_LEITURA);
}
