import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  @Input() itens = [];
  @Input() isCarrinho = false;
  constructor() {}

  ngOnInit(): void {}

  detalharProduto = (item: string) => {
    if (localStorage.getItem('permissao') != 'admin') {
      location.href = 'produto/' + item;
    } else {
      location.href = 'cadastro/' + item;
    }
  };
}
