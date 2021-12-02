<?php


header("Access-Control-Allow-Origin: *");

require_once "banco.php";

if ($_POST['userEntrar']){
    $usuario = json_decode($_POST['userEntrar']);
    $nome =  $usuario->nome;
    $senha =  $usuario->senha;
    echo json_encode($nome);
}


?>