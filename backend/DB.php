<?php
define("HOST","localhost");
define("DB_NAME","clinica");
define("DB_USER","root");
define("DB_PASSWORD","");

class DB{
    
    private $conexao;

    public function __construct(){
        $this->conexao = new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($this->conexao->connect_errno) {
            echo "Falha ao conectar no MySQL: " . $this->conexao->connect_error;
        }
    }

    public function consultar(string $query){
        $resultado = $this->conexao->query($query);
        $dados = array();
        while($linha = $resultado->fetch_assoc()){
            $dados[] = $linha;
        }
        return $dados;
    }

    public function manipular(string $query){
        $resultado = $this->conexao->query($query);
        return $resultado;
    }
}

?>