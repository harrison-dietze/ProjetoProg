import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { CadastroProdutosComponent } from '../cadastro-produtos/cadastro-produtos.component';
import { ProdutoComponent } from '../produto/produto.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro/:nome', component: CadastroProdutosComponent },
  { path: 'produto/:nome', component: ProdutoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
