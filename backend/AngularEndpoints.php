<?php


header("Access-Control-Allow-Origin: *");

require "DB.php";

if (isset($_POST['usuarioEntrar']) && $_POST['usuarioEntrar']){

    $usuario = json_decode($_POST['usuarioEntrar']);
    $nome =  $usuario->nome;
    $senha =  $usuario->senha;

    $sqlVerificar = "SELECT nome, permissao FROM usuario WHERE nome = '$nome' AND senha = '$senha'";

    $db = new DB();

    $verifacao = $db->consultar($sqlVerificar);

    if($verifacao != []) {
        session_start();
        $_SESSION["usuario"] = $nome;
        echo json_encode($verifacao[0]);
    }
    else {
        echo json_encode("Usuário ou senha incorretos.");
    }
}

if (isset($_POST['usuarioCriar']) && $_POST['usuarioCriar']){
    $usuario = json_decode($_POST['usuarioCriar']);
    $nome =  $usuario->nome;
    $senha =  $usuario->senha;

    $sqlVerificar = "SELECT nome FROM usuario WHERE nome = '$nome'";

    $db = new DB();

    $verifacao = $db->consultar($sqlVerificar);

    if($verifacao == []){
        $sqlInserir = "INSERT INTO usuario (nome,senha,permissao) VALUES ('$nome','$senha','usuario')";
        $resultado = $db->manipular($sqlInserir);
        if ($resultado == 1) {
            echo json_encode("Usuário criado com sucesso!");
        }
    } else {
        echo json_encode("Já existe um usuário com este nome.");
    }
}

if (isset($_POST['produtoCadastrar']) && $_POST['produtoCadastrar']){

    $produto = json_decode($_POST['produtoCadastrar']);
    $nome = $produto->nome;
    $descricao = $produto->descricao;
    $valor = $produto->valor;
    $estoque = $produto->estoque;
    $imagem = $produto->imagem;

    $sqlVerificar = "SELECT nome FROM produto WHERE nome = '$nome'";

    $db = new DB();

    $verifacao = $db->consultar($sqlVerificar);

    if($verifacao == []){
        $sqlInserir = "INSERT INTO produto (nome,descricao,valor,estoque,imagem) VALUES ('$nome', '$descricao', '$valor', '$estoque', '$imagem')";
        $resultado = $db->manipular($sqlInserir);
        if ($resultado==1) {
            echo json_encode("Produto cadastrado com sucesso!");
        }
    } else {
        echo json_encode("Já existe um produto com este nome.");
    }
}


?>