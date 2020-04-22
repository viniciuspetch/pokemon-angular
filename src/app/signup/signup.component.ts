import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm;
  validation;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { this.signupForm = this.formBuilder.group({ username: '', password: '' }) }

  ngOnInit(): void {
    this.validation = { invalidUsername: false, invalidPassword: false }
  }

  onSubmit(signupData) {
    console.log(signupData)
    var username = signupData.username;
    var password = signupData.password;
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
    console.log(this.validation)

    if (!this.validation.invalidUsername && !this.validation.invalidPassword) {
      var response = this.http.post('http://localhost:8001/signup', { username, password }, { responseType: 'text' });
      response.subscribe((data) => {
        this.router.navigateByUrl('/')
      })
    }
  }
}
