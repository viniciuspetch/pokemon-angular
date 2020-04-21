import { Component, OnInit } from '@angular/core'
import { FormBuilder, } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  info;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { this.loginForm = this.formBuilder.group({ username: '', password: '' }) }

  ngOnInit(): void {
  }

  onSubmit(loginData) {
    console.log(loginData);
    console.log("Here");
    var username = loginData.username;
    var password = loginData.password;

    var response = this.http.post('http://localhost:27017/login', { username, password });
    response.subscribe((data) => this.info = data)
  }

}
