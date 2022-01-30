# API de games

<div style="margin: 0 auto; text-align: center;">  
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
</div>

> API Rest feita inteiramente com NodeJS, Express e Sequelize com MySQL para operações CRUD

### Ajustes e melhorias

As seguintes melhorias ainda estão em aberto:

- [ ] Validação de campos de requisição
- [ ] Segurança da informação
- [ ] Sistema de logging

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente de `NodeJS`, `Git`, `Sequelize`,`MySQL` e `Visual Studio Code` ou outra IDE de preferência.
* Você tem uma máquina da sua preferência. De preferência sistemas baseados em `Debian 10`.
* Você tem familiaridade com `Desenvolvimento Backend` e outras tecnologias adicionais.

## 🚀 Instalação

Para instalar, siga estas etapas:

Linux, Windows e macOS:
``` 
git clone https://github.com/eng-gabrielscardoso/api-games.git
```

> Verifique se possui permissões para clonar o repositório com o administrador do projeto

## ☕ Utilização

Para usar, siga estas etapas:


1. Primeiramente, verifique se todos os requisitos previamente explicitados foram atendidos. Instale as depedências, tecnologias e tenha, especialmente, o projeto rodando em uma máquina Linux.
2. Crie um arquivo ```.env``` na raiz do projeto, contendo as variáveis de ambiente contidas no ficheiro ```.env.example```
3. Crie um banco de dados e atribua as permissões necessárias de acesso para o seu usuário:
```{bash}
$ mysql -u ${USER} -p <nome-do-banco> > ./private/schema.sql
```

```{bash}
mysql> CREATE USER 'novo-usuario'@'host-utilizado' IDENTIFIED BY 'senha-novo-usuario';
mysql> GRANT ALL PRIVILEGES ON asks_answers.* TO 'novo-usuario'@'host-utilizado';
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!

## Integração com FrontEnd

> A integração com FrontEnd pode ser feita através de requisições ```fetch``` ou através de bibliotecas como ```axios```. Para mais informações entre em contato com o desenvolvedor ou espere até novas implementações.

## Endpoints

* **GET** ```/``` : Retorno do status da API
* **GET** ```/games``` : Listagem dos games cadastrados no banco de dados
* **GET** ```/game/:id``` : Listagem de dados de um único game do banco de dados de acordo com o parâmetro ```id```
* **POST** ```/game``` : Cadastro de um novo game no banco de dados
* **DELETE** ```/game/:id``` : Exclusão de dados de um único game do banco de dados de acordo com o parâmetro ```id```
* **PUT** ```/game/:id``` : Atualização de dados de um único game do banco de dados de acordo com o parâmetro ```id```

[⬆ Voltar ao topo](#api-de-games)<br>
