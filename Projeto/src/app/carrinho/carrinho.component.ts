import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ProdutoCarrinho } from './produto.interface';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  carrinhoIconVisivel: boolean = false;
  carrinho: ProdutoCarrinho[];
  total = 0;
  localizacao: any;

  constructor() {}

  ngOnInit(): void {
    this.carrinho = [
      {
        titulo: 'Memória Ram',
        descricao: 'Memória de 8GB',
        imagem:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/MEMORIARAM.png',
        preco: 299.9,
        quantidade: 2,
      },
      {
        titulo: 'Processador Intel Core I5',
        descricao: 'Processador',
        imagem:
          'https://www.imagensempng.com.br/wp-content/uploads/2021/10/900.png',
        preco: 699.9,
        quantidade: 1,
      },
    ];
    this.localizacao = navigator.geolocation.getCurrentPosition(function (
      position
    ) {
      console.log(position);
    });
    this.calcularTotal();
  }

  calcularTotal = () => {
    for (let item of this.carrinho) {
      this.total = item.preco * item.quantidade + this.total;
      this.total.toFixed(2);
    }
  };
}
