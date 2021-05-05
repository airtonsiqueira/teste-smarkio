# Teste Smarkio

#### _Feito por Airton Siqueira_

Aplicação resposta do desafio proposto no teste para vaga de Desenvolvedor de Assistentes Virtuais.
Esse README tem por finalidade:

- Orientar na instalação e execução da aplicação.

## Instalação

A aplicação necessita de [Node.js](https://nodejs.org/) e [MySQL](mysql.com/downloads/) para sua execução.

Depois da instalação de ambos, é necessária a alteração do arquivo `config.js` na raiz do projeto.
Primeiro, é necessário a criação da base de dados e tabela no MySQL usadas nessa aplicação, que se encontra no script abaixo:

```sh
CREATE SCHEMA teste_smarkio;
  CREATE TABLE IF NOT EXISTS teste_smarkio.tts_teste (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_text VARCHAR(255) NOT NULL);
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'smarkio@01';
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smarkio@01';
```

Em seguida, preencher os campos `apikey` e `serviceUrl` de `tts_credentials` com os dados que foram enviados por e-mail.
Por último, na raiz do projeto, executar os seguintes comandos para execução da aplicação:

```sh
tts_credentials = {
  "apikey": {},
  "serviceUrl": {}
}
```

A aplicação será rodada localmente em `localhost:3000`.

```sh
npm install
npm start
```

### Sobre sua utilização:

Após a inicialização, basta inserir um comentário na caixa de texto e depois clicar em `Enviar`. Depois disso, ocorrerá um refresh na página e o comentário apareça na caixa a direito onde pode ser ouvido clicando em `Play!` ou deletado da base e dados clicando em `Excluir`

### Duvidas, bugs ou mais informações:

[Email](airtoncsiqueira@hotmail.com)
