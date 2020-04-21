import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {
  name
  pokemonInfo
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    console.log(this.route.queryParams)
    var searchName = this.name.toLowerCase()
    console.log(searchName)
    var response = this.http.get('https://pokeapi.co/api/v2/pokemon/'+searchName)
    var json;
    response.subscribe((data) => this.pokemonInfo = {types: data['types']});
  }
}
