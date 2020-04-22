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
    return str.charAt(0).toUpperCase() + str.split("_").join(" ").slice(1)
  }

  getData(tpname) {
    this.tpdata = {}
    this.token = this.loginService.getToken()
    this.name = tpname
    var searchName = this.name.toLowerCase()

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
          dmgrel.push({ name: this.capitalize(i), list })
        }
      }

      this.tpdata = { name, dmgtype, dmgrel }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getData(params['name'])
    });    
  }
}
