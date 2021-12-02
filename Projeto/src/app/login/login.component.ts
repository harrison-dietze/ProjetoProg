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

  loginForm: FormGroup;
  dados: FormData;

  isCriacao = true;
  resultado: any;
  title = 'Projeto';

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nome: new FormControl('', {
        validators: [Validators.required],
      }),
      senha: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onLogin(isCriacao: boolean) {
    if (!isCriacao) {
      this.onEntrarUsuario();
    } else {
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
        console.log(this.usuarioLogado);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
