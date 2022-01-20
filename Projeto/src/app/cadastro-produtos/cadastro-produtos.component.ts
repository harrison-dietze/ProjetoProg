import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
})
export class CadastroProdutosComponent implements OnInit {
  constructor(private fileUploadService: UploadService) {}

  upload: FormData;
  produto: FormGroup;
  imagemURL: any;
  arquivo: File;

  ngOnInit(): void {
    this.produto = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      imagem: new FormControl('', Validators.required),
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
    this.upload = new FormData();
    this.upload.append(
      'uploadImagem',
      this.arquivo,
      this.produto.get('nome').value
    );
    this.fileUploadService.postar(this.upload);
  };
}
