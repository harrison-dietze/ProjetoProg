import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  constructor() {}

  @Input() carrinho = true;

  pesquisaForm: any;
  menuVisivel = false;

  ngOnInit(): void {
    this.pesquisaForm = new FormGroup({
      pesquisa: new FormControl(''),
    });
  }
  onPesquisar = () => {};
  botaoCarrinho = () => {
    location.href = '/carrinho';
  };
  tratarMenu() {
    this.menuVisivel = !this.menuVisivel;
  }
}
