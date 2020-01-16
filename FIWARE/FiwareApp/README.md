# Aplicação de exemplo - FIWARE
Nesse repositório, há uma aplicação que faz consultas a API REST do componente Orion, o qual é reponsável pelo gerenciamento de dados de contexto coletados por dispositivos IoT previamente registrados no IoT Agent. A aplicação foi desenvolvida para consultar as medições geradas por um sensor ultrasônico e para iniciar o fluxo de envio de comando para o acionamento de um motor servo, consultando posteriormente o resultado obtido para esse comando.
# RUN
A aplicação pode ser executada via terminal ou via WebSM

### Terminal
Para executar a aplicação, é necessário instalar o Node.js e o NPM (Gerenciador de pacotes do Node). 

Dentro do diretório raiz da aplicação, abra o terminal e digite: 
```
sudo npm install (instala as dependências do projeto)
```
```
npm start (executa a aplicação)
```
### Arquivo YAML para deploy via WebSM
```
Nessa abordagem, caso precise alterar a aplicação, é necessário gerar um nova imagem e enviá-la para o DockerHub, também é
necessário alterar a propriedade image do arquivo YAML (FiwareApp.yaml) da aplicação, atribuindo o nome da nova imagem criada.
```
Acesse a seção Slices e selecione o slice desejado.

<p align="center">
  <img src="./Images/yaml1.png">
</p>

Na aba applications clique em + ADD.

<p align="center">
  <img src="./Images/yaml2.png">
</p>

Insira a URL do arquivo YAML da aplicação e clique em SAVE.
```
O arquivo está no repositório do projeto, basta efetuar um clique no arquivo (FiwareApp.yaml), clicar em raw e copiar a URL do arquivo que está na barra de endereço do navegador.

URL obtida:
https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/FiwareApp/FiwareApp.yaml
```
<p align="center">
  <img src="./Images/yaml3.png">
</p>

# Orion - Subscriptions
O Orion Context Broker provê um recurso chamado subscrições, que consiste basicamente em notificar sua aplicação em uma determinada rota HTTP sempre que um atributo ou um comando (resultado do comando) de algum dispositivo for atualizado, evitando assim que sua aplicação tenha que ficar de tempos em tempos verificando se um determinado dispositivo publicou alguma atualização. No contexto dessa aplicação, após registar o sensor ultrasônico e o motor servo via interface web do WebSM, informando seus ids, assim como um atributo "distance" para armazenar a distância coletada pelo sensor ultrasônico e o comando "move" para armazenar o resultado do comando enviado pelo motor servo após ele ser acionado. Sempre que algum desses dispositivos publicarem uma atualização, a aplicação de exemplo será notificada em uma rota HTTP definida para cada um desses dispositivos, consultado o valor atualizado do atributo (distance) do sensor ultrasônico, ao ser notificada pelo ORION na rota HTTP definida para o sensor ultrasônico, assim como o valor atualizado do comando (move) do motor servo, ao ser notificada pelo ORION na rota HTTP definida para o motor servo.

### Entidade de dados
Dentro da plataforma FIWARE, todo dispositivo é representando como uma entidade de dados, que é uma representação de algum objeto físico ou conceitual do mundo real.

##### Exemplo da estrutura de um dispositivo dentro da plataforma FIWARE

```
{
     "device_id":   "sensor1s",
     "entity_name": "urn:ngsi-ld:Thing:sensor1s", //ID da entidade de dados
     "entity_type": "Thing", //Tipo
     "attributes": [
       { "object_id": "distance", "name": "distance", "type": "Double" }
     ]
}

```
O nome da entidade e o tipo são preenchidos pelo SW4IoT_FIWARE_Manager no momento do cadastro do dispositivo feito via interface web do WebSM, por isso essas informações não são solicitadas durante o processo de cadastro do dispositivo.

Para subescrever a aplicação de exemplo

Utilizando algum cliente HTTP como o [Postman](https://www.getpostman.com/) ou [Insomnia](https://insomnia.rest/download/), envie as seguintes requisições para o Orion Context Broker:

##### A aplicação será notificada pelo Orion sempre que o sensor ultrasônico publicar uma nova distância
```
Método: HTTP POST
URL: http://IP_ORION:1026/v2/subscriptions
Corpo da requisição:
{
  "description": "Me notifique sempre que o sensor ultrasônico publicar um nova medição",
  "subject": {
    "entities":
     	[{
	   "idPattern": "urn:ngsi-ld:Thing:sensor1s", //Nome da entidade de dados correspondente ao sensor ultrasônico.
           "type": "Thing"
	}],
     "condition": {
      "attrs": [ "distance" ] //Sempre que esse atributo for atualizado a aplicação será notificada.
    }
  },
  "notification": {
    "http": {
      "url": "http://IP_Aplicação:5600/measurementresult" //Rota na qual a aplicação será notificada.
    }
  }
}
```
##### A aplicação será notificada pelo Orion sempre que o motor servo publicar um novo resultado para o comando
```
Método: HTTP POST
URL: http://IP_ORION:1026/v2/subscriptions
Corpo da requisição:
{
  "description": "Me notifique sempre que o motor servo publicar um novo resultado para o comando enviado",
  "subject": {
    "entities":
     	[{
	   "idPattern": "urn:ngsi-ld:Thing:servomotor", //Nome da entidade de dados correspondente ao dispositivo.
           "type": "Thing"
	}],
     "condition": {
      //nome_do_comando_info corresponde ao resultado do comando
      //Sempre que o resultado para o comando mover for atualizado a aplicação será notificada.
      "attrs": [ "mover_info" ]  
    }
  },
  "notification": {
    "http": {
      "url": "http://IP_Aplicação:5600/commandresult" //Rota na qual a aplicação será notificada.
    }
  }
}
```


