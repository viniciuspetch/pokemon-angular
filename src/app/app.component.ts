import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  token;

  constructor(private router: Router, private loginService: LoginService) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.token = this.loginService.getToken();
      }
    })
  }

  ngOnInit(): void {
    console.log("/")

    this.token = this.loginService.getToken()
    this.title = "Pokémon Info - Angular";
    
    console.log(this.token)
  }

  signout() {
    this.loginService.clearToken();
    this.token = this.loginService.getToken();
    this.router.navigateByUrl('/');
  }
}
