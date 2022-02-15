import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/routing.module';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ListaComponent } from './lista/lista.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { CurrencyPipe } from '@angular/common';
import { ProdutoComponent } from './produto/produto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CabecalhoComponent,
    CarrinhoComponent,
    ListaComponent,
    CadastroProdutosComponent,
    ProdutoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [LoginService, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
