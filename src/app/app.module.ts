import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { TypeListComponent } from './type-list/type-list.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatButtonModule} from '@angular/material/button'; 

import {MatToolbarModule} from '@angular/material/toolbar'; 
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    TypeListComponent,
    PokemonInfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: 'pokelist', component: PokemonListComponent }, { path: 'typelist', component: TypeListComponent }, { path: 'pokemon/:name', component: PokemonInfoComponent }, { path: 'login', component: LoginComponent }]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
