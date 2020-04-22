import { Component, OnInit } from '@angular/core';
import { pokemonlist } from '../pokemonlist'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pkListFinal;
  pkListUnfiltered;
  searchWord;

  constructor() { }

  searchChange(searchWord) {
    var pkListFinal = []
    for (var i = 0; i < 8; i++) {
      pkListFinal.push(this.pkListUnfiltered[i].filter((item) => item.toLowerCase().includes(searchWord)))
    }
    this.pkListFinal = pkListFinal
  }

  ngOnInit(): void {
    this.searchWord = "";
    var pkListUnfiltered = [];
    for (var i = 0; i < 8; i++) {
      pkListUnfiltered.push(pokemonlist["gen" + (i + 1)]);
    }
    this.pkListUnfiltered = pkListUnfiltered;
    this.pkListFinal = pkListUnfiltered;
  }
}
