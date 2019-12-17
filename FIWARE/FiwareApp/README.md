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
Nessa abordagem, caso precise alterar a aplicação é necessário gerar um nova imagem e enviá-la para o DockerHub, também é
necessário alterar a propriedade image (atribuindo o nome da nova imagem) do arquivo YAML da aplicação.
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





