import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { Router, NavigationEnd } from "@angular/router";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  token;
  showMenu;

  constructor(public breakpointObserver: BreakpointObserver, private router: Router, private loginService: LoginService) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.token = this.loginService.getToken();
      }
    })
  }

  ngOnInit(): void {
    this.showMenu = false;
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showMenu = false;
        } else {
          this.showMenu = true;
        }
      });

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
