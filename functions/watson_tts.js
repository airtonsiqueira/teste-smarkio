var config = require('../config.js')
var mysqlFunctions = require('./mysql.js')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var fs = require("fs");
var path = require("path");

const util = require('util')

// Com o comment_text, gera o áudio utilizando o Waton TTS e salva o buffer
// na pasta 'audios' na raiz em formato .wav
function generate_audio_file(comment_id, comment_text){
    return new Promise((resolve, reject) => {
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({
                apikey: config.tts_credentials.apikey,
            }),
        })
        let synthesizeParams = {
            text: comment_text,
            accept: 'audio/wav',
            voice: 'pt-BR_IsabelaV3Voice'
        };
        textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            file_path = path.resolve(`./public/audios/${comment_id}.wav`)
            const writeFileSync = util.promisify(fs.writeFileSync)
            writeFileSync(file_path, buffer);
            resolve({"operation_status": true, 'file_path': file_path})
        }).catch(err => {
            reject(err)
        });
    })
}


module.exports = { generate_audio_file }