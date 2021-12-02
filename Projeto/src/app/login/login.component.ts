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
  usuario: Usuario;

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
    this.dados.append('userEntrar', JSON.stringify(this.loginForm.value));
    this.LoginService.logarService(this.dados).subscribe(
      (res) => {
        this.resultado = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCriarUsuario() {}
}
