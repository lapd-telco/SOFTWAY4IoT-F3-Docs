# Introdução 
<div style="text-align: justify;"> 
<p style="text-align:center;">Este manual descreve em detalhes a utilização do SOFTWAY4IoT já integrado com a plataforma FIWARE.  A plataforma FIWARE pode ser definida como um arcabouço de componentes capaz de auxiliar no desenvolvimento de aplicações em um ambiente IoT. O SOFTWAY4IoT é uma solução corporativa para gerência de gateways IoT para cenários de campus e cidade inteligentes. Na integração estão presentes os seguintes componentes da plataforma FIWARE:</p>

- ORION: responsável por gerenciar dados de contexto gerados por dispositivos IoT, oferecendo operações de gerenciamento e consulta desses mesmos dados via API REST.
- IoT Agent: funciona como um gateway de tradução de protocolo, convertendo os dados de diferentes tipos de protocolo para o formato de dados NGSI, o qual foi adotado pela plataforma FIWARE, sendo utilizado pelo ORION em todas suas interações. O IoT Agent provê duas portas: 

  - 4041 (porta norte): utilizada para operações de gerenciamento de dispositivos IoT.
  - 7896 (porta sul): utilizada para o envio de medições geradas por dispositivos IoT.

<p>Os dois componentes da FIWARE descritos acima utilizam uma instância do gerenciador de banco de dados MongoDB para persistência de dados. Sendo utilizado pelo ORION para armazenar dados de contexto gerados por aplicações e/ou dispositivos, e pelo IoT Agent para armazenar informações sobre dispositivos IoT.<p>
</div>

# Arquitetura
![](/FIWARE/Images/DistribuiçãoDosComponentes.png)

<p>O processo de integração é realizado através de um conjunto de interações entre componentes específicos da FIWARE e do SOFTWAY4IoT. A Figura acima apresenta a arquitetura proposta para essa integração, exibindo as interações entre os componentes ORION, IoT Agent e o MongoDB (todos da FIWARE), e os componentes WebSM, SW4IoT_FIWARE_Manager, devicesApp FIWARE e os diferentes drivers de protocolo utilizados para comunicação com dispositivos IoT (do SOFTWAY4IoT). As seções a seguir apresentam em detalhes as características de cada um desses componentes.</p>

# Componentes SOFTWAY4IoT
### SW4IoT_FIWARE_Manager
O SW4IoT_FIWARE_Manager é o componente responsável pelo gerenciamento de dispositivos junto ao IoT Agent, o qual provê uma API RESTful para esse gerenciamento. Através desse componente é possível realizar as seguintes operações: registrar um novo dispositivo, alterar, excluir e obter informações de dispositivos já registrados. Ele atua encaminhando os dados informados via interface Web do WebSM para o registro no IoT Agent

### WebSM
O WebSM é a ferramenta de administração do SOFTWAY4IoT para múltiplos gateways IoT, a qual possibilita criar slices (fatias de recursos), associá-los aos gateways, além de adicionar, editar e remover dispositivos de comunicação sem fio e aplicações associadas às slices

### Drivers
Os drivers são responsáveis por lidar com as especificidades dos protocolos de comunicação sem fio que não implementam toda a pilha TCP/IP e, por essa razão, não conseguem estabelecer comunicação diretamente com a internet. Para que o processo de comunicação aconteça, faz-se necessário a existência de um elemento intermediário ( driver ). Esse elemento é o responsável por realizar o processo de tradução entre o protocolo de comunicação original do dispositivo e o TCP/IP (padrão de comunicação para a Internet).

### devicesApp FIWARE
Na plataforma FIWARE, existe um IoT Agent específico para lidar com as particularidades de cada protocolo. Como os drivers do SOFTWAY4IoT já desempenham essa função, optamos por utilizá-los, eliminando a necessidade de incluir na arquitetura um IoT Agent para cada tipo de protocolo. Assim, a devicesApp foi desenvolvida para intermediar a comunicação entre os dispositivos via driver e o IoT Agent da FIWARE, atuando no repasse de comandos provenientes do IoT Agent destinados aos dispositivos IoT atuadores e no repasse de medições geradas por dispositivos IoT sensores destinadas ao IoT Agent.

# Componentes FIWARE
### ORION Context Broker
ORION é responsável pelo gerenciamento de dados de contexto das aplicações que utilizam a plataforma FIWARE, disponibilizando serviços de consulta e atualização desses dados através de uma API NGSI. Existem apenas dois tipos possíveis de interações de dados entre IoT Agent e ORION: as interações queryContext e updateContext. A queryContext é utilizada para operações de consulta e a updateContext para operações de atualização. Nessa integração, o ORION será utilizado para o gerenciamento de dados gerados por dispositivos IoT devidamente registrados no SOFTWAY4IoT, sejam eles sensores ou atuadores. Não foi necessário realizar mudanças no ORION para a integração.



