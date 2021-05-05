function playAudio(id){
    audio_id = "audio_" + id
    console.log("Esse é o id: " + id)
    var audio_button = document.getElementById(audio_id).parentElement;
    console.log(audio_button)
    audio_button.play()
}

function deleteAudio(id){
    console.log("Esse é o id: " + id)
    if (confirm("Clique em 'OK' para excluir o comentário permanentemente")) {
            $.post("/delete", {'comment_id': id},
            function(resposta){
                if (resposta.status == true){
                    document.location.reload();
                }
            });
    }
}

function insertNewComment(textarea_id){
    var comentario = document.getElementById(textarea_id).value;
    console.log("Esse é o comentário:\n" + comentario)
    $.post("/insert", {'comment_text': comentario},
    function(resposta){
        if (resposta.status == true){
            document.location.reload();
        }
    });
}