import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
