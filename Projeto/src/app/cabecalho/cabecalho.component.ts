import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  constructor() {}

  menuVisivel = false;
  tratarMenu() {
    this.menuVisivel = !this.menuVisivel;
  }

  ngOnInit(): void {}
}
