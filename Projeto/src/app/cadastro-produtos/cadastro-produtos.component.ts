import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css'],
})
export class CadastroProdutosComponent implements OnInit {
  constructor() {}

  produto: FormGroup;
  imagemURL = '';

  ngOnInit(): void {
    this.produto = new FormGroup({
      nome: new FormControl(),
      descricao: new FormControl(),
      imagem: new FormControl(),
    });
  }

  fileInput = (imagem) => {
    this.imagemURL = URL.createObjectURL(imagem[0]);
    this.imagemURL = this.imagemURL.replace('blob:', '');
    console.log(this.imagemURL);
  };
}
