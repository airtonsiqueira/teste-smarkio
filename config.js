tts_credentials = {
  "apikey": {},
  "serviceUrl": {}
}

  mysql_credentials = {
    "user": "root",
    "password": "smarkio@01",
    "host": "localhost",
    "database": "teste_smarkio"
  }

  SQL_create = `CREATE SCHEMA teste_smarkio;
  CREATE TABLE IF NOT EXISTS teste_smarkio.tts_teste (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_text VARCHAR(255) NOT NULL);
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'smarkio@01'; 
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'smarkio@01';`
  
  SQL_first_populate = `INSERT INTO teste_smarkio.tts_teste(comment_text)
  VALUES ('O Rato roeu a roupa do rei de Roma'), ('Batatinha quando nasce espalha rama pelo chão')`

module.exports = { tts_credentials, mysql_credentials }


