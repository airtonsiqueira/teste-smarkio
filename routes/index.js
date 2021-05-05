var express = require('express');
var router = express.Router();
var reload = require("require-reload")(require)
const fs = require('fs')
var main_functions = require('../functions/main.js')
var mysql_functions = require('../functions/mysql.js')




/* GET home page. */
router.get('/', function(req, res, next) {
  main_functions.generate_audio_to_all().then(result => {
    // console.log(result.audios_filelist)
    setTimeout(() => {
      res.render('index', { title: 'Express' , data: result.audios_filelist});
    }, 2000)
    
  })

});

router.post('/delete', function(req, res){
  let data = req.body
  delete_id = data.comment_id
  main_functions.delete_audio_and_comment(delete_id).then(result => {
    console.log("O elemento de ID: " + "foi deletado do banco de dados")
    if(result.operation_status == true){
      res.send({"status": true})
    }
  })
});

router.post('/insert', function(req, res){
  let data = req.body
  comment = data.comment_text
  console.log("O comentário: " + comment + "foi adicionado ao banco de dados")
  mysql_functions.insertOne(comment).then(result => {
    if(result.operation_status == true){
      console.log('O ID do comentário inserido é: ' + result.inserted_element_id)
      res.send({"status": true})
    }
  })

});

module.exports = router;
