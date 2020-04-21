import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {
  name
  pokemonInfo
  token
  constructor(private route: ActivatedRoute, private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log("/pokemon/:pokemon");
    console.log(localStorage.getItem("token"));
    this.token = localStorage.getItem("token");
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    var searchName = this.name.toLowerCase()
    var response = this.http.get('https://pokeapi.co/api/v2/pokemon/' + searchName)
    response.subscribe((data) => {this.pokemonInfo = data; console.log(this.pokemonInfo)});
  }
}
