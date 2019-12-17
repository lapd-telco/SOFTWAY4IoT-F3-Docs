# Aplicação de exemplo - FIWARE
Nesse repositório, há uma aplicação que faz consultas a API REST do componente ORION, o qual é reponsável pelo gerenciamento de dados de contexto coletados por dispositivos IoT previamente registrados no IoT Agent. A aplicação foi desenvolvida para consultar as medições geradas por um sensor ultrasônico e para iniciar o fluxo de envio de comando para o acionamento de um motor servo, consultando posteriormente o resultado obtido para esse comando.
# Execução
- Após clonar o repositório
Para executar a aplicação, é necessário intalar o Node.js e o NPM (Gerenciador de pacotes do Node) 
Dentro do diretório raiz da aplicação, abra o terminal e digite:
```
sudo npm install
```
Isso irá instalar as dependências do projeto, para executer digite:
```
npm start
```



