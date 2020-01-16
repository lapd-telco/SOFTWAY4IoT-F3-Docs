# Aplicações de exemplo - Arduino Uno + Shield Lora (Dragino) 
Nesse repositório há 3 aplicações de exemplo para teste, sendo:
 * Uma aplicação que ativa um motor servo ao receber um pacote LoRa gerado pela interface LoRa do gateway.</br>
 [LoRa_Receiver_ArduinoUno_Servo](./LoRa_Receiver_ArduinoUno_Servo)
 * Uma aplicação que envia através de um pacote LoRa as medições coletadas por um sensor ultrasônico, sendo esse pacote            interceptado pela interface LoRa do gateway.</br> 
 [LoRa_Sender_ArduinoUno_Ultrasonic](./LoRa_Sender_ArduinoUno_Ultrasonic)
 * Uma aplicação que opera nos dois sentidos, mesclando as duas aplicações anteriores (Utilizada no teste final).</br>
 [LoRa_Bidirecional_ArduinoUno_Servo_ULtrasonic](./LoRa_Bidirecional_ArduinoUno_Servo_ULtrasonic.ino)
# Exemplos utilizados como base no desenvolvimento da aplicação da interface LoRa do gateway (Heltec esp32)
 * Uma aplicação que atua como LoRa Sender
 * Um aplicação que atua como LoRa Receiver</br>
A aplicação da interface LoRa do gateway atua nos dois sentidos, tando no recebimento de pacotes LoRa, quanto no envio. 
#### A Aplicação da interface LoRa do gateway pode ser encontrada em:
 SOFTWAY4IoT-F3-Drivers/gateway/codigo_gw.ino
# Disposição dos componentes - Teste LoRa
<p align="center">
  <img src="../Images/Disposição_dos_Componentes-LoRa.png">
</p>

