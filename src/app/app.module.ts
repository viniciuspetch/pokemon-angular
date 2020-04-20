import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { TypeListComponent } from './type-list/type-list.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    TypeListComponent,
    PokemonInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: 'pokelist', component: PokemonListComponent }, { path: 'typelist', component: TypeListComponent }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
