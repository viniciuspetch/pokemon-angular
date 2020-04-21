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

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { this.signupForm = this.formBuilder.group({ username: '', password: '' }) }

  ngOnInit(): void {
  }

  onSubmit(signupData) {
    console.log(signupData)
    var username = signupData.username;
    var password = signupData.password;

    var response = this.http.post('http://localhost:8001/signup', { username, password }, { responseType: 'text' });
    response.subscribe((data) => {
      this.router.navigateByUrl('/')
    })
  }
}
