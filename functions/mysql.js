var config = require('../config.js')
var mysql = require("mysql");

// Cria Conexão MySQL
function createMySQLConnection(){     
    return new Promise((resolve, reject) => {
        var conn = mysql.createConnection({
            host: config.mysql_credentials.host,
            user: config.mysql_credentials.user,
            password: config.mysql_credentials.password,
            database: config.mysql_credentials.database
        })
        
        conn.connect(function(err){
            if(conn.state === 'connected'){
                resolve({'status': true, 'connection': conn})
            } else{
                resolve({'status': false, 'content': 'The connection cannot be established. Check credentials and verify that the database is installed and online'})
            }
        })
    })
}

// Seleciona todo conteúdo do db
function selectAllFromDatabase(){ 
    return new Promise((resolve, reject) => {
        createMySQLConnection().then(connection_response =>{
            if (connection_response['status'] == true){
                conn = connection_response['connection']
                conn.connect(function(err) {
                    let mysql_query = `SELECT * FROM tts_teste;`
                    let arr = []
                    conn.query(mysql_query, (error, results) => {
                        for (let result in results){
                            item = {"id": results[result]['comment_id'], "comment": results[result]['comment_text']}
                            arr.push(item)
                        }
                        conn.end()
                        resolve({'operation_status:': true, 
                        'query_result': arr})
                    })
                })
            }    
        })  
    })
}

// Insere um novo elemento no db
function insertOne(comment){
    return new Promise((resolve, reject) => {
    createMySQLConnection().then(connection_response =>{
        if (connection_response['status'] == true){
            conn = connection_response['connection']
            conn.connect(function(err) {
                let statement = `INSERT INTO tts_teste (comment_text) VALUES (?)`
                conn.query(statement, comment, (error, results, fields) => { resolve({'operation_status': true, 'inserted_element_id': results.insertId})})
            })
        }
    })
})
}

// Delete elemento pelo comment_id
function deleteOne(comment_id){
    return new Promise((resolve, reject) => {
    createMySQLConnection().then(connection_response =>{
        if (connection_response['status'] == true){
            conn = connection_response['connection']
            conn.connect(function(err) {
                let statement = `DELETE FROM teste_smarkio.tts_teste WHERE comment_id = (?)`
                conn.query(statement, comment_id, (error, results, fields) => { resolve({'operation_status': true})})
            })
        }
    })
})
}

module.exports = {selectAllFromDatabase, insertOne, deleteOne}