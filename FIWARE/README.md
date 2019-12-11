# Índice
1. [Introdução](#Introdução)
2. [Arquitetura](#Arquitetura)
3. [Componentes SOFTWAY4IoT](#Componentes-SOFTWAY4IoT)
   * 3.1. [SW4IoT_FIWARE_Manager](#SW4IoT_FIWARE_Manager)
   * 3.2. [WebSM](#WebSM)
   * 3.3. [Drivers](#Drivers)
   * 3.4. [devicesApp FIWARE](#devicesApp-FIWARE)
4. [Componentes FIWARE](Componentes-FIWARE)
   * 4.1. [ORION Context Broker](ORION-Context-Broker)
   * 4.2. [IoT Agent](IoT-Agent)
5. [Envio de Comandos - Tráfego Southbound](Envio-de-Comandos---Tráfego Southbound)

  


    

# Introdução  
Este manual descreve em detalhes a utilização do SOFTWAY4IoT já integrado com a plataforma FIWARE.  A plataforma FIWARE pode ser definida como um arcabouço de componentes capaz de auxiliar no desenvolvimento de aplicações em um ambiente IoT. O SOFTWAY4IoT é uma solução corporativa para gerência de gateways IoT para cenários de campus e cidade inteligentes. Na integração estão presentes os seguintes componentes da plataforma FIWARE:

- ORION: responsável por gerenciar dados de contexto gerados por dispositivos IoT, oferecendo operações de gerenciamento e consulta desses mesmos dados via API REST.
- IoT Agent: funciona como um gateway de tradução de protocolo, convertendo os dados de diferentes tipos de protocolo para o formato de dados [NGSI](https://fiware-tutorials.readthedocs.io/en/latest/linked-data/index.html#ngsi-v2-data-model), o qual foi adotado pela plataforma FIWARE, sendo utilizado pelo ORION em todas suas interações. O IoT Agent provê duas portas: 

  - 4041 (porta norte): utilizada para operações de gerenciamento de dispositivos IoT.
  - 7896 (porta sul): utilizada para o envio de medições geradas por dispositivos IoT.

Os dois componentes da FIWARE descritos acima utilizam uma instância do gerenciador de banco de dados MongoDB para persistência de dados. Sendo utilizado pelo ORION para armazenar dados de contexto gerados por aplicações e/ou dispositivos, e pelo IoT Agent para armazenar informações sobre dispositivos IoT.

# Arquitetura
![Arquitetura](/FIWARE/Images/ArquiteturaIntegração[FIWARE].png)
### Figura 1 – Arquitetura da integração do SOFTWAY4IoT com a plataforma FIWARE.

O processo de integração é realizado através de um conjunto de interações entre componentes específicos da FIWARE e do SOFTWAY4IoT. A Figura 1 apresenta a arquitetura proposta para essa integração, exibindo as interações entre os componentes ORION, IoT Agent e o MongoDB (todos da FIWARE), e os componentes WebSM, SW4IoT_FIWARE_Manager, devicesApp FIWARE e os diferentes drivers de protocolo utilizados para comunicação com dispositivos IoT (do SOFTWAY4IoT). As seções a seguir apresentam em detalhes as características de cada um desses componentes.

# Componentes SOFTWAY4IoT
### SW4IoT_FIWARE_Manager
O SW4IoT_FIWARE_Manager é o componente responsável pelo gerenciamento de dispositivos junto ao IoT Agent, o qual provê uma API RESTful para esse gerenciamento. Através desse componente é possível realizar as seguintes operações: registrar um novo dispositivo, alterar, excluir e obter informações de dispositivos já registrados. Atua no encaminhamento dos dados informados via interface Web do WebSM para o registro no IoT Agent

### WebSM
O WebSM é a ferramenta de administração do SOFTWAY4IoT para múltiplos gateways IoT, a qual possibilita criar slices (fatias de recursos), associá-los aos gateways, além de adicionar, editar e remover dispositivos de comunicação sem fio e aplicações associadas às slices

### Drivers
Os drivers são responsáveis por lidar com as especificidades dos protocolos de comunicação sem fio que não implementam toda a pilha TCP/IP e, por essa razão, não conseguem estabelecer comunicação diretamente com a internet. Para que o processo de comunicação aconteça, faz-se necessário a existência de um elemento intermediário ( driver ). Esse elemento é o responsável por realizar o processo de tradução entre o protocolo de comunicação original do dispositivo e o TCP/IP (padrão de comunicação para a Internet).

### devicesApp FIWARE
Na plataforma FIWARE, existe um IoT Agent específico para lidar com as particularidades de cada protocolo. Como os drivers do SOFTWAY4IoT já desempenham essa função, optamos por utilizá-los, eliminando a necessidade de incluir na arquitetura um IoT Agent para cada tipo de protocolo. Assim, a devicesApp foi desenvolvida para intermediar a comunicação entre os dispositivos via driver e o IoT Agent da FIWARE, atuando no repasse de comandos provenientes do IoT Agent destinados aos dispositivos IoT atuadores e no repasse de medições geradas por dispositivos IoT sensores destinadas ao IoT Agent.

# Componentes FIWARE
### ORION Context Broker
ORION é responsável pelo gerenciamento de dados de contexto das aplicações que utilizam a plataforma FIWARE, disponibilizando serviços de consulta e atualização desses dados através de uma API REST. Existem apenas dois tipos possíveis de interações de dados entre IoT Agent e ORION: as interações queryContext e updateContext. A queryContext é utilizada para operações de consulta e a updateContext para operações de atualização. Nessa integração, o ORION será utilizado para o gerenciamento de dados gerados por dispositivos IoT devidamente registrados no SOFTWAY4IoT, sejam eles sensores ou atuadores. Não foi necessário realizar mudanças no ORION para a integração.
### IoT Agent
IoT Agent é responsável por intermediar a comunicação entre dispositivos IoT e ORION, traduzindo os dados de diferentes tipos de protocolo para para o formato NGSI, o qual é utilizado pelo ORION em todas suas interações. Nessa integração, será utilizado o IoT Agent for JSON, o qual atua como uma ponte entre o protocolo JSON e o NGSI. 

O tráfego que flui através do IoT Agent é dividido em dois tipos: tráfego Southbound e Northbound. Todo tráfego gerado pelo ORION em direção a um dispositivo atuador é chamado de tráfego Southbound, que consiste no envio de requisições de comando geradas pelo ORION em direção a um dispositivo IoT. O tráfego Northbound consiste no envio de medições geradas por sensores em direção ao ORION.

Para que um dispositivo possa receber comandos ou enviar medições, é necessário registrá-lo no IoT Agent. A esse processo dá-se o nome de provisionamento. Ao registar um dispositivo, seja um sensor ou atuador, devemos informar: o seu ID; sua entidade de dados, que é a forma como um dispositivo é representado dentro da plataforma FIWARE; o tipo da entidade; os atributos que correspondem ao valor de leitura de cada sensor e os comandos disponíveis para cada atuador, sendo também necessário informar o endpoint (URL) no qual o dispositivo está atendendo à requisições.

Na integração entre FIWARE e SOFTWAY4IoT, a comunicação com os dispositivos IoT será realizada de acordo com a tecnologia de comunicação utilizada pelos mesmos. Para os dispositivos que utilizam tecnologias de comunicação que implementam toda a pilha TCP/IP, e.g., Wi-Fi e Ethernet, o processo de comunicação será realizado diretamente entre o respectivo dispositivo e o IoT Agent. Para esses casos, não é necessário a utilização do nenhum mecanismo para interfacear a comunicação, pois os respectivos dispositivos possuem a capacidade de atender as requisições HTTP de forma direta. Para os dispositivos que utilizam tecnologias de comunicação que não implementam toda a pilha TCP/IP, e.g., Lora, Zigbee, nRF24, o processo de comunicação será realizado através da utilização de um agente intermediário, responsável por interfacear a comunicação entre o respectivo dispositivo e o IoT Agent. Nesse cenário, a devicesApp e os drivers, serão os responsáveis por intermediar o processo de comunicação, realizando a tradução entre o protocolo original do dispositivo e o HTTP.

# Envio de Comandos - Tráfego Southbound
Originalmente, na plataforma FIWARE, ao enviar um comando, o IoT Agent realiza uma requisição HTTP POST ao endpoint do dispositivo e fica aguardando pela resposta. A resposta em questão, consiste em um JSON com o resultado da requisição. O resultado é então encaminhado ao ORION para persistência.

##### Exemplo de resposta enviada ao IoT Agent pela aplicação que ativa um determinado dispositivo atuador 
```
{"mover": "movido com sucesso"} 
// "mover" é nome do comando registrado para o dispositivo atuador via WebSM.
// "movido com sucesso" é o resultado para o comando, o qual será persistido pelo ORION no MongoDB.
```
O fluxo é iniciado com o envio de uma requisição de atualização (updateContext) ao ORION solicitando a atualização para o resultado de um comando. O ORION então encaminhará a carga útil (payload) dessa requisição para o IoT Agent. Caso o IoT Agent aceite o comando, ele enviará um código HTTP 200 como resposta ao ORION. Essa resposta é encaminhada à aplicação de usuário que iniciou a interação. Essa primeira requisição tem por objetivo apenas iniciar o processo de envio de comandos em segundo plano no IoT Agent. A partir desse ponto, o fluxo segue caminhos distintos, de acordo com a tecnologia de comunicação utilizada pelo respectivo dispositivo envolvido no processo de comunicação. Maiores detalhes podem ser observados nas Seções 5.1 e 5.2.

### Envio de comandos para dispositivos IoT em comunicação direta com o IoT Agent (Wi-FI e Ethernet)
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/FluxoComandos%5BIoTAgent%5D.png">
</p>

### Figura 2 – Fluxo de envio de comando a um atuador em comunicação direta com o IoT Agent.
Após o IoT Agent obter os dados necessárias para o envio do comando, ele realizará uma requisição HTTP ao respectivo dispositivo e ficará aguardando por uma resposta. A resposta em questão, consiste em um JSON com o resultado para o comando previamente encaminhado. De posse do resultado, o IoT Agent o enviará ao ORION por meio de uma requisição de atualização
(updateContext), para que o mesmo seja atualizado. Para obter o resultado do respectivo comando, é necessário fazer uma requisição de consulta (queryContext) para o ORION.

### Envio de comandos para dispositivos IoT por meio da devicesApp e do driver (LoRa, Zigbee, nRF24)
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/FluxoComandos%5BDrivers%5D.png">
</p>

### Figura 3 – Fluxo de envio de comando a um atuador por meio da devicesApp e do driver.
Após o IoT Agent obter os dados necessárias para o envio do comando, ele enviará à devicesApp uma requisição HTTP passando o ID do dispositivo a ser acionado. A devicesApp então usará uma conexão TCP para encaminhar o ID do dispositivo ao driver. A seguir, o driver enviará o comando ao dispositivo. Quando obtiver o resultado do comando proveniente do dispositivo, o driver o encaminhará através da conexão TCP previamente estabelecida com a devicesApp. A seguir, a devicesApp enviará um JSON com o resultado do comando ao IoT Agent através de uma requisição HTTP. Após receber o resultado, o IoT Agent o enviará ao ORION por meio de uma requisição de atualização (updateContext) para que o resultado do comando seja atualizado. Para obter o resultado do comando, é necessário fazer uma requisição de consulta (queryContext) ao ORION.

A comunicação com os dispositivos que utilizam tecnologias de comunicação que não implementam toda a pilha TCP, e.g., LoRa, Zigbee, nRF24, dentre outros, ocorrerá através dos drivers do SOFTWAY4IoT e não através do IoT Agent. As requisições de comando recebidas pelo IoT Agent serão repassados à devicesApp e  não ao dispositivo, pois a responsabilidade de lidar com as particularidades de cada protocolo foi transferida aos drivers do SOFTWAY4IoT. Para que as requisições de comando sejam encaminhadas à devicesApp, todo dispositivo registrado no IoT Agent deverá receber o endpoint da devicesApp e, portanto, toda requisição de comando será encaminhada a ela

Para que a devicesApp saiba para qual dispositivo o comando deve ser encaminhado, foi necessário realizar uma alteração no código fonte do IoT Agent, fazendo com que ao enviar uma requisição de comando, o IoT Agent passe como um parâmetro na requisição o ID do dispositivo a ser acionado. Com esse ID, a devicesApp enviará o comando  ao dispositivo através de seu respectivo driver. Ao receber o resultado para o comando proveniente do dispositivo, a devicesApp o encaminhará ao IoT Agent através de um JSON, da mesma forma que um dispositivo compatível com o IoT Agent for JSON faria.

# Envio de medições - Tráfego Northbound
Originalmente na plataforma FIWARE, uma aplicação que gerencia um sensor obteria uma medição e a enviaria ao IoT Agent através de uma requisição HTTP POST, informando o ID do dispositivo, a API KEY, o atributo para qual o resultado da medição será associado e o resultado da medição. A API Key é necessária para autenticação dos dispositivos, podendo ser definida uma única API Key global no arquivo de configuração do IoT Agent [(config.js)](https://github.com/telefonicaid/iotagent-json/blob/master/config.js). Alternativamente, é possível fornecer uma API Key ao criar um serviço, o que consiste em criar grupos individuais de dispositivos associados a um determinado contexto, podendo definir uma API Key para cada grupo.
```diff
- Obs: nesta versão, não há suporte a criação de serviços. Caso seja necessário, esse recurso será incluso em uma próxima versão.
```
### Envio de medições de dispositivos IoT em comunicação direta com o IoT Agent (Wi-FI ou Ethernet)
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/FluxoMedi%C3%A7%C3%B5es%5BIoTAgent%5D.png">
</p>

### Figura 4 – Fluxo de envio de medições de um sensor em comunicação direta com o IoT Agent.
O fluxo é iniciado com um dispositivo encaminhando uma medição ao IoT Agent através de uma requisição HTTP POST, informando o ID do dispositivo, o atributo para qual o resultado da medição será associado, o resultado da medição e a API Key, a qual foi definida globalmente no arquivo de configuração do IoT Agent. Caso o dispositivo esteja devidamente registrado no IoT Agent, ele receberá como resposta um código HTTP 200. Em seguida, o IoT Agent encaminhará o resultado da medição ao ORION para persistência. Para obter o resultado dessa medição, é necessário fazer uma requisição de consulta (queryContext) ao ORION

##### Exemplo de medição enviada ao IoT Agent pela aplicação que ativa um determinado dispositivo sensor 
```
http://200.129.207.169:7896/iot/json?i=sensor1&k=123
Corpo da requisição
{"distancia": 20} 

// i é o ID do dispositivo
// k é a API key definida no arquivo de configuração do IoT Agent
// "distancia" é nome do atributo registrado para o dispositivo sensor via WebSM.
// 20 é o resultado da medição, o qual será persistido pelo ORION no MongoDB.
```
### Envio de medições de dispositivos IoT por meio da devicesApp e do driver (LoRa, Zigbee, nRF24)
Na integração entre FIWARE e SOFTWAY4IoT, a devicesApp atuará como uma aplicação, recebendo os dados de leitura de um sensor através de seu respectivo driver e os encaminhando ao IoT Agent através de uma requisição HTTP POST.
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/FluxoMedi%C3%A7%C3%B5es%5BDrivers%5D.png">
</p>

### Figura 5 – Fluxo de envio de medição de um sensor.
O fluxo é iniciado com um dispositivo enviando uma medição ao seu respectivo driver. Ao receber essa medição, o driver a encaminhará à devicesAPP através de uma conexão TCP. Após receber a medição, a devicesApp enviará uma requisição HTTP ao IoT Agent, informando o ID do dispositivo, o atributo para qual o resultado da medição será associado, o resultado da medição e a API Key,  a qual foi definida globalmente no arquivo de configuração do IoT Agent. O IoT Agent então encaminhará o  resultado da medição ao ORION para persistência. Para obter o resultado dessa medição, é necessário fazer uma requisição de consulta (queryContext) ao ORION.

# Disposição dos componentes da arquitetura
A Figura 6 ilustra a distribuição dos componentes da arquitetura, sendo o ORION e o MongoDB implantados (preferencialmente) no FIWARE Lab e os demais componentes nos elementos do SOFTWAY4IoT. É possível outros posicionamentos dos componentes, porém, no contexto do projeto, essa distribuição parece ser a mais adequada.

![](/FIWARE/Images/DistribuiçãoDosComponentes.png)

### Figura 6 - Distribuição dos componentes da arquitetura.


