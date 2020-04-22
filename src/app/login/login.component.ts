import { Component, OnInit } from '@angular/core'
import { FormBuilder, } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { LoginService } from '../login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  validation;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private loginService: LoginService) { this.loginForm = this.formBuilder.group({ username: '', password: '' }) }

  ngOnInit(): void {
    this.validation = { invalidUsername: false, invalidPassword: false, invalidResponse: false }
  }

  onSubmit(loginData) {
    var username = loginData.username;
    var password = loginData.password;
    if (!username || username == "") {
      this.validation.invalidUsername = true;
    }
    else {
      this.validation.invalidUsername = false;
    }
    if (!password || password == "") {
      this.validation.invalidPassword = true;
    }
    else {
      this.validation.invalidPassword = false;
    }

    if (!this.validation.invalidUsername && !this.validation.invalidPassword) {
      var response = this.http.post('http://localhost:8001/login', { username, password });
      response.subscribe((data) => {
        if (!data["token"] || data["token"] == "") {
          this.validation.invalidResponse = true;
        }
        else {
          this.validation.invalidResponse = false;
          this.loginService.setToken(data['token']);
          if (this.loginService.getToken()) {
            this.router.navigateByUrl('/')
          }
        }
      })
    }
  }
}
