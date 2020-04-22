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

  ngOnInit(): void {
    console.log("/pokemon/:pokemon");
    console.log(this.loginService.getToken());

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

      for (let i of data['types']) {
        types.push(i.type.name)
      }
      for (let i in data['abilities']) {
        abilities.push(data['abilities'][i].ability.name)
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

        moves.push({ name: data['moves'][i].move.name, how: how })
      }
      this.pkdata = { id, sprite, name, types, abilities, moves }
      console.log(this.pkdata)
    });
  }
}
