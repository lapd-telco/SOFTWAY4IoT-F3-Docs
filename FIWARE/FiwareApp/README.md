# Aplicação de exemplo - FIWARE
Nesse repositório, há uma aplicação que faz consultas a API REST do componente ORION, o qual é reponsável pelo gerenciamento de dados de contexto coletados por dispositivos IoT previamente registrados no IoT Agent. A aplicação foi desenvolvida para consultar as medições geradas por um sensor ultrasônico e para iniciar o fluxo de envio de comando para o acionamento de um motor servo, consultando posteriormente o resultado obtido para esse comando.
# RUN

### Terminal
Para executar a aplicação, é necessário instalar o Node.js e o NPM (Gerenciador de pacotes do Node). 

Dentro do diretório raiz da aplicação, abra o terminal e digite: 
```
sudo npm install (instala as dependências do projeto)
```
```
npm start (executa a aplicação)
```
### Arquivo Yaml para deploy via WebSM
Acesse a seção Slices e selecione o slice desejado.
<p align="center">
  <img src="https://raw.githubusercontent.com/LABORA-INF-UFG/SOFTWAY4IoT-F3-Docs/master/FIWARE/Images/FluxoComandos%5BDrivers%5D.png">
</p>








