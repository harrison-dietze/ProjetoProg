import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  resultado: '';
  title = 'Projeto';
  constructor(private LoginService: LoginService) {}

  testar(user: string) {
    const dados: FormData = new FormData();
    dados.append('user', user);
    this.LoginService.logarService(dados).subscribe(
      (res) => {
        this.resultado = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
