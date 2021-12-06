import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Usuario } from './usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioLogado: Usuario;

  senhaValidacao = new FormControl('');

  loginForm: FormGroup;
  dados: FormData;

  isCriacao: boolean = true;
  resultado: any;
  isSenhasIguais: boolean = true;
  marcarNome: boolean = false;
  marcarSenha: boolean = false;

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nome: new FormControl(''),
      senha: new FormControl(''),
    });

    this.senhaValidacao = new FormControl('');
  }

  onLogin(isCriacao: boolean) {
    if (!this.verificarCamposObrigatorios()) {
      return;
    }

    if (!isCriacao) {
      this.onEntrarUsuario();
    } else {
      if (!this.verificarSenhasIguais()) {
        return;
      }
      this.onCriarUsuario();
    }
  }

  onEntrarUsuario(): void {
    this.dados = new FormData();
    this.dados.append('usuarioEntrar', JSON.stringify(this.loginForm.value));
    this.LoginService.loginService(this.dados).subscribe(
      (res) => {
        this.usuarioLogado = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCriarUsuario() {
    this.dados = new FormData();
    this.dados.append('usuarioCriar', JSON.stringify(this.loginForm.value));
    this.LoginService.loginService(this.dados).subscribe(
      (res) => {
        if (res != 'Já existe um usuário com este nome.') {
          this.usuarioLogado = res;
        } else {
          alert(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verificarSenhasIguais() {
    if (this.senhaValidacao.value != this.loginForm.value.senha) {
      this.isSenhasIguais = false;
      return false;
    } else {
      this.isSenhasIguais = true;
      return true;
    }
  }

  verificarCamposObrigatorios() {
    if (this.loginForm.value.nome.toString().length < 4) {
      this.marcarNome = true;
    } else {
      this.marcarNome = false;
    }
    if (this.loginForm.value.senha.toString().length < 6) {
      this.marcarSenha = true;
    } else {
      this.marcarSenha = false;
    }
    if (this.marcarSenha == true || this.marcarNome == true) {
      return false;
    } else {
      return true;
    }
  }
}
