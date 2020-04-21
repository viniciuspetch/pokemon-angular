import { Component } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private loginService: LoginService) { }
  title = 'pokemon-angular';

  signout() {
    this.loginService.clearToken()
  }
}
