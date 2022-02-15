import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
})
export class CadastroProdutosComponent implements OnInit {
  constructor(
    private fileUploadService: UploadService,
    private produtoService: ProdutosService,
    private pipeMonetaria: CurrencyPipe
  ) {}

  upload: FormData;
  formProduto: FormGroup;
  imagemURL: any;
  arquivo: File;
  produto: any;
  dados: FormData;
  //precoNumber: number;
  isEdicao: boolean = false;

  ngOnInit(): void {
    this.formProduto = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      imagem: new FormControl(null, Validators.required),
    });

    //this.aplicarMascaraValor();
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
            estoque: this.formProduto.get('estoque').value,
            valor: this.formProduto.get('valor').value,
          };
          this.dados = new FormData();
          this.dados.append('produtoCadastrar', JSON.stringify(this.produto));
          this.produtoService
            .cadastroProdutosService(this.dados)
            .subscribe((res) => {
              this.formProduto.disable();
              this.isEdicao = true;
            });
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

  /*
  aplicarMascaraValor = () => {
    //função para valor monetário e evitar uso do input type="number"
    let parser = this.formProduto.get('valor').value;
    if (isNaN(parser)) {
      this.formProduto.get('valor').reset();
      alert('Insira um valor válido.');
      return;
    }
    this.precoNumber = parser / 100;
    parser = this.pipeMonetaria.transform(parser);
    this.formProduto.get('valor').patchValue(parser);
  };
  */
}
