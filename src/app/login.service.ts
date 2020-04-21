import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = null;
  constructor() { }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
