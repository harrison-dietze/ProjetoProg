<?php


header("Access-Control-Allow-Origin: *");

require "DB.php";

if ($_POST['usuarioEntrar']){
    $usuario = json_decode($_POST['usuarioEntrar']);
    $nome =  $usuario->nome;
    $senha =  $usuario->senha;
    echo json_encode($usuario);
}

if ($_POST['usuarioCriar']){
    $usuario = json_decode($_POST['usuarioCriar']);
    $nome =  $usuario->nome;
    $senha =  $usuario->senha;

    $sqlVerificar = "SELECT nome FROM usuario WHERE nome = '$nome'";

    $db = new DB();

    $verifacao = $db->consultar($sqlVerificar);

    if($verifacao == []){
        $sqlInserir = "INSERT INTO usuario (nome,senha) VALUES ('$nome','$senha')";
        $resultado = $db->manipular($sqlInserir);
        if ($resultado == 1) {
            echo json_encode($usuario);
        }
    } else {
        echo json_encode("Já existe um usuário com este nome.");
    }
}
?>