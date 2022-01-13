import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  constructor() {}

  pesquisaForm: any;
  menuVisivel = false;
  tratarMenu() {
    this.menuVisivel = !this.menuVisivel;
  }

  ngOnInit(): void {
    this.pesquisaForm = new FormGroup({
      pesquisa: new FormControl(''),
    });
  }
  onPesquisar = () => {};
}
