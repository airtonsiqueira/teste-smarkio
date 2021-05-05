var mysqlFunctions = require('./mysql.js')
var ttsFunctions = require('./watson_tts.js')
var fs = require("fs");
var path = require("path");
const util = require('util')
var path = require("path");
// Cria novo array contendo id, comentário e caminho do arquivo de áudio já gerado
function create_files_list(query_result){
    audios_list = []
    for (item in query_result){
        id = query_result[item]['id']
        comment = query_result[item]['comment']
        file_path = `audios/${id}.wav`
        audios_list.push({'id': id, 'comment': comment, 'file_path': file_path})
    }
    return audios_list
}

// Pega todos os elementos do DB, repassa ao TTS e cria os arquivos de áudio na pasta 'audios'
// retornando um array contendo id, comentário e caminho absoluto de todos os arquivos.
function generate_audio_to_all(){
    return new Promise((resolve, reject) => {
        mysqlFunctions.selectAllFromDatabase().then(db_result => {
            for (item in db_result.query_result){
                id = db_result.query_result[item]['id']
                text = db_result.query_result[item]['comment']
                ttsFunctions.generate_audio_file(id, text).then(audio =>{})
            }
            audio_list = create_files_list(db_result.query_result)
            resolve({'operation_status:': true, 'audios_filelist': audio_list})
        })
    })
}

function delete_audio_and_comment(comment_id){
    return new Promise((resolve, reject) => {
        mysqlFunctions.deleteOne(comment_id).then(db_result => {
            if(db_result.operation_status == true){
                file_path = '../public/audios/' + comment_id + '.wav'
                
                var absolutePath = path.resolve(file_path);
                fs.unlink(absolutePath, () =>{
                    console.log('Arquivo ' + absolutePath + " deletado")
                })
            }
        })
        resolve({'operation_status': true})
    })
}

module.exports = { generate_audio_to_all, delete_audio_and_comment}