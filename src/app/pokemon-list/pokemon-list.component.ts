import { Component, OnInit } from '@angular/core';
import { pokemonlist } from '../pokemonlist'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonlist;

  constructor() { }

  ngOnInit(): void {
    this.pokemonlist = pokemonlist
    var pokemonListOnly = []
    for (var i = 0; i < 8; i++) {
      pokemonListOnly.push(pokemonlist["gen" + (i + 1)])
    }
    this.pokemonlist = pokemonListOnly
  }

}
