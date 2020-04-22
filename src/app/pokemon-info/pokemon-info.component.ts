import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.css']
})
export class PokemonInfoComponent implements OnInit {
  name;
  pkdata;
  token;
  abilities;

  constructor(private route: ActivatedRoute, private http: HttpClient, private loginService: LoginService, private changeDetectorRef: ChangeDetectorRef) { }

  capitalize(str): string {
    //return str.charAt(0).toUpperCase() + str.split("_").join(" ").split("-").join(" ").slice(1)
    var aux = str.split("_").join(" ").split("-").join(" ").split(" ")
    for (let i in aux) {
      aux[i] = aux[i].charAt(0).toUpperCase() + aux[i].slice(1)
    }
    return aux.join(" ")
  }

  ngOnInit(): void {
    this.pkdata = {}
    this.token = this.loginService.getToken()
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    var searchName = this.name.toLowerCase()
    var response = this.http.get('https://pokeapi.co/api/v2/pokemon/' + searchName)
    response.subscribe((data) => {
      var id = data['id']
      var name = this.name
      var sprite = data['sprites'].front_default

      var types = []
      var abilities = []
      var moves = []
      var stats = []

      for (let i of data['types']) {
        types.push(this.capitalize(i.type.name))
      }
      for (let i in data['abilities']) {
        abilities.push(this.capitalize(data['abilities'][i].ability.name))
      }
      for (let i in data['moves']) {
        var how = "";
        var learnMethod = data['moves'][i].version_group_details[0].move_learn_method.name
        if (learnMethod == 'level-up') {
          how = 'Levelup at level ' + data['moves'][i].version_group_details[0].level_learned_at;
        }
        else if (learnMethod == 'machine') {
          how = 'TM/HM';
        }
        else if (learnMethod == 'tutor') {
          how = 'Move Tutor'
        }
        else if (learnMethod == 'egg') {
          how = 'Egg Move'
        }

        moves.push({ name: this.capitalize(data['moves'][i].move.name), how: how })
      }
      /*
      for (let i of data['stats']) {
        stats.push({ name: i.stat.name, value: i.base_stat })
      }
      */
      stats.push({name: 'Speed', value: data['stats'][0].base_stat})
      stats.push({name: 'Sp.Defense', value: data['stats'][1].base_stat})
      stats.push({name: 'Sp.Attack', value: data['stats'][2].base_stat})
      stats.push({name: 'Defense', value: data['stats'][3].base_stat})
      stats.push({name: 'Attack', value: data['stats'][4].base_stat})
      stats.push({name: 'HP', value: data['stats'][5].base_stat})
      stats = stats.reverse()
      this.pkdata = { id, sprite, stats, name, types, abilities, moves }
    });
  }
}
