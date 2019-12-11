# 1. Introdução  
Este manual descreve em detalhes a utilização do SOFTWAY4IoT já integrado com a plataforma FIWARE.  A plataforma FIWARE pode ser definida como um arcabouço de componentes capaz de auxiliar no desenvolvimento de aplicações em um ambiente IoT. O SOFTWAY4IoT é uma solução corporativa para gerência de gateways IoT para cenários de campus e cidade inteligentes. Na integração estão presentes os seguintes componentes da plataforma FIWARE:

- ORION: responsável por gerenciar dados de contexto gerados por dispositivos IoT, oferecendo operações de gerenciamento e consulta desses mesmos dados via API REST.
- IoT Agent: funciona como um gateway de tradução de protocolo, convertendo os dados de diferentes tipos de protocolo para o formato de dados NGSI, o qual foi adotado pela plataforma FIWARE, sendo utilizado pelo ORION em todas suas interações. O IoT Agent provê duas portas: 

  - 4041 (porta norte): utilizada para operações de gerenciamento de dispositivos IoT.
  - 7896 (porta sul): utilizada para o envio de medições geradas por dispositivos IoT.

Os dois componentes da FIWARE descritos acima utilizam uma instância do gerenciador de banco de dados MongoDB para persistência de dados. Sendo utilizado pelo ORION para armazenar dados de contexto gerados por aplicações e/ou dispositivos, e pelo IoT Agent para armazenar informações sobre dispositivos IoT.

# 2. Arquitetura
![Arquitetura](/FIWARE/Images/ArquiteturaIntegração[FIWARE].png)
### Figura 1 – Arquitetura da integração do SOFTWAY4IoT com a plataforma FIWARE.

<p>O processo de integração é realizado através de um conjunto de interações entre componentes específicos da FIWARE e do SOFTWAY4IoT. A Figura 1 apresenta a arquitetura proposta para essa integração, exibindo as interações entre os componentes ORION, IoT Agent e o MongoDB (todos da FIWARE), e os componentes WebSM, SW4IoT_FIWARE_Manager, devicesApp FIWARE e os diferentes drivers de protocolo utilizados para comunicação com dispositivos IoT (do SOFTWAY4IoT). As seções a seguir apresentam em detalhes as características de cada um desses componentes.</p>

# 3. Componentes SOFTWAY4IoT
### 3.1 SW4IoT_FIWARE_Manager
O SW4IoT_FIWARE_Manager é o componente responsável pelo gerenciamento de dispositivos junto ao IoT Agent, o qual provê uma API RESTful para esse gerenciamento. Através desse componente é possível realizar as seguintes operações: registrar um novo dispositivo, alterar, excluir e obter informações de dispositivos já registrados. Atua no encaminhamento dos dados informados via interface Web do WebSM para o registro no IoT Agent

### 3.2 WebSM
O WebSM é a ferramenta de administração do SOFTWAY4IoT para múltiplos gateways IoT, a qual possibilita criar slices (fatias de recursos), associá-los aos gateways, além de adicionar, editar e remover dispositivos de comunicação sem fio e aplicações associadas às slices

### 3.3 Drivers
Os drivers são responsáveis por lidar com as especificidades dos protocolos de comunicação sem fio que não implementam toda a pilha TCP/IP e, por essa razão, não conseguem estabelecer comunicação diretamente com a internet. Para que o processo de comunicação aconteça, faz-se necessário a existência de um elemento intermediário ( driver ). Esse elemento é o responsável por realizar o processo de tradução entre o protocolo de comunicação original do dispositivo e o TCP/IP (padrão de comunicação para a Internet).

### 3.4 devicesApp FIWARE
Na plataforma FIWARE, existe um IoT Agent específico para lidar com as particularidades de cada protocolo. Como os drivers do SOFTWAY4IoT já desempenham essa função, optamos por utilizá-los, eliminando a necessidade de incluir na arquitetura um IoT Agent para cada tipo de protocolo. Assim, a devicesApp foi desenvolvida para intermediar a comunicação entre os dispositivos via driver e o IoT Agent da FIWARE, atuando no repasse de comandos provenientes do IoT Agent destinados aos dispositivos IoT atuadores e no repasse de medições geradas por dispositivos IoT sensores destinadas ao IoT Agent.

# 4. Componentes FIWARE
### 4.1 ORION Context Broker
ORION é responsável pelo gerenciamento de dados de contexto das aplicações que utilizam a plataforma FIWARE, disponibilizando serviços de consulta e atualização desses dados através de uma API REST. Existem apenas dois tipos possíveis de interações de dados entre IoT Agent e ORION: as interações queryContext e updateContext. A queryContext é utilizada para operações de consulta e a updateContext para operações de atualização. Nessa integração, o ORION será utilizado para o gerenciamento de dados gerados por dispositivos IoT devidamente registrados no SOFTWAY4IoT, sejam eles sensores ou atuadores. Não foi necessário realizar mudanças no ORION para a integração.
### 4.2 IoT Agent
IoT Agent é responsável por intermediar a comunicação entre dispositivos IoT e ORION, traduzindo os dados de diferentes tipos de protocolo para para o formato NGSI, o qual é utilizado pelo ORION em todas suas interações. Nessa integração, será utilizado o IoT Agent for JSON, o qual atua como uma ponte entre o protocolo JSON e o NGSI. 

O tráfego que flui através do IoT Agent é dividido em dois tipos: tráfego Southbound e Northbound. Todo tráfego gerado pelo ORION em direção a um dispositivo atuador é chamado de tráfego Southbound, que consiste no envio de requisições de comando geradas pelo ORION em direção a um dispositivo IoT. O tráfego Northbound consiste no envio de medições geradas por sensores em direção ao ORION.

Para que um dispositivo possa receber comandos ou enviar medições, é necessário registrá-lo no IoT Agent. A esse processo dá-se o nome de provisionamento. Ao registar um dispositivo, seja um sensor ou atuador, devemos informar: o seu ID; sua entidade de dados, que é a forma como um dispositivo é representado dentro da plataforma FIWARE; o tipo da entidade; os atributos que correspondem ao valor de leitura de cada sensor e os comandos disponíveis para cada atuador, sendo também necessário informar o endpoint (URL) no qual o dispositivo está atendendo à requisições.

Na integração entre FIWARE e SOFTWAY4IoT, a comunicação com os dispositivos IoT será realizada de acordo com a tecnologia de comunicação utilizada pelos mesmos. Para os dispositivos que utilizam tecnologias de comunicação que implementam toda a pilha TCP/IP, e.g., Wi-Fi e Ethernet, o processo de comunicação será realizado diretamente entre o respectivo dispositivo e o IoT Agent. Para esses casos, não é necessário a utilização do nenhum mecanismo para interfacear a comunicação, pois os respectivos dispositivos possuem a capacidade de atender as requisições HTTP de forma direta. Para os dispositivos que utilizam tecnologias de comunicação que não implementam toda a pilha TCP/IP, e.g., Lora, Zigbee, nRF24, o processo de comunicação será realizado através da utilização de um agente intermediário, responsável por interfacear a comunicação entre o respectivo dispositivo e o IoT Agent. Nesse cenário, a devicesApp e os drivers, serão os responsáveis por intermediar o processo de comunicação, realizando a tradução entre o protocolo original do dispositivo e o HTTP.

### 5. Envio de Comandos - Tráfego Southbound
Originalmente, na plataforma FIWARE, ao enviar um comando, o IoT Agent realiza uma requisição HTTP POST ao endpoint do dispositivo e fica aguardando pela resposta. A resposta em questão, consiste em um JSON com o resultado da requisição. O resultado é então encaminhado ao ORION para persistência.

## Exemplo de resposta enviada ao IoT Agent pela aplicação que gerencia um determinado dispositivo atuador 
```
{"mover": "movido com sucesso"} 
// "mover" é nome do comando registrado para o dispositivo atuador via WebSM
// "movido com sucesso" é o resultado para o comando, o qual será persistido pelo ORION no MongoDB
```
O fluxo é iniciado com o envio de uma requisição de atualização (updateContext) ao ORION solicitando a atualização para o resultado de um comando. O ORION então encaminhará a carga útil (payload) dessa requisição para o IoT Agent. Caso o IoT Agent aceite o comando, ele enviará um código HTTP 200 como resposta ao ORION. Essa resposta é encaminhada à aplicação de usuário que iniciou a interação. Essa primeira requisição tem por objetivo apenas iniciar o processo de envio de comandos em segundo plano no IoT Agent. A partir desse ponto, o fluxo segue caminhos distintos, de acordo com a tecnologia de comunicação utilizada pelo respectivo dispositivo envolvido no processo de comunicação. Maiores detalhes podem ser observados nas Seções 5.1 e 5.2.

#### 5.1	Envio de comandos para dispositivos IoT em comunicação direta com o IoT Agent (Wi-FI e Ethernet)



