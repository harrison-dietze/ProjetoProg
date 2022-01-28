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

if (isset($_POST['produtoExcluir']) && $_POST['produtoExcluir']){

    $produto = json_decode($_POST['produtoExcluir']);
    $nome = $produto->nome;

    $sqlVerificar = "SELECT nome FROM produto WHERE nome = '$nome'";

    $db = new DB();

    $verificacao =  $db->consultar($sqlVerificar);

    if($verificacao == []){
        echo json_decode("Nenhum produto com este nome!");
    } else {
        $sqlExcluir = "DELETE FROM produto WHERE nome = '$nome'";
        $resultado = $db->excluir($sqlInserir);
        echo json_encode("Produto excluido com sucesso!");
    }
}


if (isset($_POST['uploadImagem']) && $_POST['uploadImagem']){
    echo json_encode("Já existe um produto com este nome.");
}

if($_SERVER['REQUEST_METHOD']=="POST"){
    if (isset($_FILES['uploadImagem']['tmp_name'])) {
        if( $_FILES['uploadImagem']['tmp_name']) {
            $dir = "/opt/lampp/htdocs/imagens/";
            $file = $_FILES["uploadImagem"];
            $filePath = $file["tmp_name"];

            if(isset($_POST['extensao']) && $_POST['extensao']) {
                $fileExtension = substr($_POST['extensao'], -3);
            }
            if (move_uploaded_file($filePath, $dir.$file['name'].'.'.$fileExtension)) {

                echo json_encode($dir.$file['name'].'.'.$fileExtension);

            }
            else {
                echo json_encode('Erro no upload da imagem.');
            }
        }
    }
}

if(isset($_POST['produtoEditar']) && $_POST['produtoEditar']){

    $produto = json_decode($_POST['produtoEditar']);
    $nome = $produto->nome;
    $descricao = $produto->descricao;
    $valor = $produto->valor;
    $estoque = $produto->estoque;
    $imagem = $produto->imagem;

    $sqlVerificar = "SELECT nome FROM produto WHERE nome = '$nome'";

    $db = new DB();

    $verificacao = $db->consultar($sqlVerificar);

    if($verificacao == []){
        echo json_encode("Nenhum produto para editar com este nome!");
    } else {
        $sqlEditar = "UPDATE FROM produto (nome,descricao,valor,estoque,imagem) VALUES ('$nome', '$descricao', '$valor', '$estoque', '$imagem')";
        $resultado = $db->editar($sqlEditar);
        echo json_encode("Produto editado com sucesso!");
    }

}


?>