import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service'
import { typelist } from '../typelist'

@Component({
  selector: 'app-type-info',
  templateUrl: './type-info.component.html',
  styleUrls: ['./type-info.component.css']
})
export class TypeInfoComponent implements OnInit {
  name;
  tpdata;
  token;

  constructor(private route: ActivatedRoute, private http: HttpClient, private loginService: LoginService) { }

  capitalize(str): string {
    return str.charAt(0).toUpperCase()+str.split("_").join(" ").slice(1)
  }

  ngOnInit(): void {
    console.log("/pokemon/:pokemon");
    console.log(this.loginService.getToken());

    this.tpdata = {}
    this.token = this.loginService.getToken()
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    var searchName = this.name.toLowerCase()
    console.log(searchName)

    var foundUrl = ""
    for (let i of typelist) {
      if (i.name == this.name) {
        foundUrl = i.url;
      }
    }
    var response = this.http.get(foundUrl)
    response.subscribe((data) => {
      var name = this.name;
      var dmgtype = this.capitalize(data['move_damage_class'].name);

      var dmgrel = []
      for (let i in data['damage_relations']) {
        var list = []
        for (let j of data['damage_relations'][i]) {
          list.push(this.capitalize(j.name));
        }
        if (list.length != 0) {
          dmgrel.push({name: this.capitalize(i), list})
        }
      }

      this.tpdata = { name, dmgtype, dmgrel }
      console.log(this.tpdata)
    })

    /*
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
      stats.push({name: 'Speed', value: data['stats'][0].base_stat})
      stats.push({name: 'Sp.Defense', value: data['stats'][1].base_stat})
      stats.push({name: 'Sp.Attack', value: data['stats'][2].base_stat})
      stats.push({name: 'Defense', value: data['stats'][3].base_stat})
      stats.push({name: 'Attack', value: data['stats'][4].base_stat})
      stats.push({name: 'HP', value: data['stats'][5].base_stat})
      stats = stats.reverse()
      this.pkdata = { id, sprite, stats, name, types, abilities, moves }
      console.log(this.pkdata)
    });
    */
  }

}