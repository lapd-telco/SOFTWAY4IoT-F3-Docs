# Aplicação de exemplo - FIWARE
Nesse repositório, há uma aplicação que faz consultas a API REST do componente ORION, o qual é reponsável pelo gerenciamento de dados de contexto coletados por dispositivos IoT previamente registrados no IoT Agent. A aplicação foi desenvolvida para consultar as medições geradas por um sensor ultrasônico e para iniciar o fluxo de envio de comando para o acionamento de um motor servo, consultando posteriormente o resultado obtido para esse comando.
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
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/yaml1.png">
</p>

Na aba applications clique em + ADD.

<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/yaml2.png">
</p>

Insira a URL do arquivo YAML da aplicação e clique em SAVE.
```
O arquivo está no repositório do projeto, basta efetuar um clique no arquivo (FiwareApp.yaml), clicar em raw e copiar a URL do arquivo que está na barra de endereço do navegador.

URL obtida:
https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/FiwareApp/FiwareApp.yaml
```
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/yaml3.png">
</p>

# ORION - Subscriptions
O Orion Context Broker provê um recurso chamado subscrições, que consiste basicamente em notificar sua aplicação em uma determinada rota HTTP sempre que um atributo ou o resultado para um comando de algum dispositivo for atualizado, evitando assim que sua aplicação tenha que ficar de tempos em tempos verificando se um determinado dispositivo (sensor) publicou alguma nova medição ou um novo resultado para um comando (atuador). Essa aplicação foi implementada visando a utilização desse recurso, por isso, para seu correto funcionamento, é necessário registar (subsescrever) essa aplicação no ORION.

### Entidade de dados
Dentro da plataforma FIWARE, Todo dispositivo é representando como uma entidade de dados, que é uma representação de algum objeto do mundo real.

##### Exemplo da estrutura de um dispositivo dentro da plataforma FIWARE

```
{
     "device_id":   "sensor001",
     "entity_name": "urn:ngsi-ld:Thing:001", //ID da entidade de dados
     "entity_type": "Thing",
     "attributes": [
       { "object_id": "c", "name": "count", "type": "Integer" }
     ]
   }

```
O nome da entidade e o tipo são preenchidos pelo SW4IoT_FIWARE_Manager no momento do cadastro do dispositivo feito via interface web do WebSM, por isso, essas informações não são solicitadas durante o processo de cadastro do dispositivo.

```
HTTP POST
http://200.129.207.169:1026/v2/subscriptions
{
  "description": "Notify me of all sensor distance changes",
  "subject": {
    "entities":
     	[{
				"idPattern": "urn:ngsi-ld:Thing:servomotor", i
				"type": "Thing"
			}],
     "condition": {
      "attrs": [ "mover_info" ] 
    }
  },
  "notification": {
    "http": {
      "url": "http://200.129.207.169:5600/commandresult" //Rota na qual a aplicação será notificada.
    }
  }
}
```


