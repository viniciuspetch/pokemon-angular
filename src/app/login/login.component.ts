import { Component, OnInit } from '@angular/core'
import { FormBuilder, } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private loginService: LoginService) { this.loginForm = this.formBuilder.group({ username: '', password: '' }) }

  ngOnInit(): void {
    console.log(this.loginService.getToken())
  }

  onSubmit(loginData) {
    console.log(loginData);
    console.log("Here");
    var username = loginData.username;
    var password = loginData.password;

    var response = this.http.post('http://localhost:8001/login', { username, password });
    response.subscribe((data) => { this.loginService.setToken(data['token']), console.log(this.loginService.getToken()) })
  }

  logout() {
    this.loginService.clearToken();
  }

}
