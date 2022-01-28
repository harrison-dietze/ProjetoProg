import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroProdutosService } from '../cadastro-produtos.service';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
})
export class CadastroProdutosComponent implements OnInit {
  constructor(
    private fileUploadService: UploadService,
    private cadastroProdutoService: CadastroProdutosService
  ) {}

  upload: FormData;
  formProduto: FormGroup;
  imagemURL: any;
  arquivo: File;
  produto: any;
  dados: FormData;

  ngOnInit(): void {
    this.formProduto = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      imagem: new FormControl(null, Validators.required),
    });
  }

  fileInput = (imagem) => {
    if (imagem[0]) {
      this.arquivo = imagem[0];
      var reader = new FileReader();
      reader.readAsDataURL(imagem[0]);
      reader.onload = (event: any) => {
        this.imagemURL = event.target.result;
      };
    }
  };

  salvarProduto = () => {
    if (!this.verificarPreenchimento()) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    this.upload = new FormData();

    if (this.arquivo.size / 1048576 <= 4) {
      this.upload.append(
        'uploadImagem',
        this.arquivo,
        this.formProduto.get('nome').value
      );

      let extensao =
        '.' +
        this.arquivo.type.substring(this.arquivo.type.lastIndexOf('/') + 1);

      if (extensao == '.png' || extensao == '.jpg' || extensao == '.jpeg') {
        this.upload.append('extensao', this.arquivo.type);
        this.fileUploadService.postar(this.upload).subscribe((res) => {
          this.produto = {
            nome: this.formProduto.get('nome').value,
            imagem: res,
            descricao: this.formProduto.get('descricao').value,
            estoque: 0,
            valor: 6.0,
          };
          this.dados = new FormData();
          this.dados.append('produtoCadastrar', JSON.stringify(this.produto));
          this.cadastroProdutoService
            .cadastroProdutosService(this.dados)
            .subscribe((res) => {});
        });
      } else {
        alert('Tipo de arquivo inválido.');
      }
    } else {
      alert('Este arquivo é muito grande.');
    }
  };

  verificarPreenchimento = () => {
    if (
      this.formProduto.get('nome').value == '' ||
      this.formProduto.get('descricao').value == '' ||
      this.arquivo == null
    ) {
      return false;
    } else {
      return true;
    }
  };
}
