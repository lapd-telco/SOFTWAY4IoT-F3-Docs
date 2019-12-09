### Introdução 
<div style="text-align: justify;"> 
<p style="text-align:center;">Este manual descreve em detalhes a utilização do SOFTWAY4IoT já integrado com a plataforma FIWARE.  A plataforma FIWARE pode ser definida como um arcabouço de componentes capaz de auxiliar no desenvolvimento de aplicações em um ambiente IoT. O SOFTWAY4IoT é uma solução corporativa para gerência de gateways IoT para cenários de campus e cidade inteligentes. Na integração estão presentes os seguintes componentes da plataforma FIWARE:</p>

- ORION: responsável por gerenciar dados de contexto gerados por dispositivos IoT, oferecendo operações de gerenciamento e consulta desses mesmos dados via API REST.
- IoT Agent: funciona como um gateway de tradução de protocolo, convertendo os dados de diferentes tipos de protocolo para o formato de dados NGSI, o qual foi adotado pela plataforma FIWARE, sendo utilizado pelo ORION em todas suas interações. O IoT Agent provê duas portas: 

  - 4041 (porta norte): utilizada para operações de gerenciamento de dispositivos IoT.
  - 7896 (porta sul): utilizada para o envio de medições geradas por dispositivos IoT.

<p>Os dois componentes da FIWARE descritos acima utilizam uma instância do gerenciador de banco de dados MongoDB para persistência de dados. Sendo utilizado pelo ORION para armazenar dados de contexto gerados por aplicações e/ou dispositivos, e pelo IoT Agent para armazenar informações sobre dispositivos IoT.<p>
</div>
### Arquitetura 
![](/FIWARE/ThingsApps_Raspberrypi_WIFI/Docs/images/Disposição_dos_Componentes-WiFi.jpg)
![](/Images/DistribuiçãoDosComponentes.png)



