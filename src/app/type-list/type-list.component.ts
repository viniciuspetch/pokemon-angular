import { Component, OnInit } from '@angular/core';
import { typelist } from '../typelist'

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  typelist;
  constructor() { }

  ngOnInit(): void {
    this.typelist = typelist;
  }

}
