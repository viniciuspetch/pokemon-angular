import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  setToken(token) {
    localStorage.setItem("token", token)
  }

  getToken() {
    return localStorage.getItem("token")
  }

  clearToken() {
    this.setToken("")
  }
}
