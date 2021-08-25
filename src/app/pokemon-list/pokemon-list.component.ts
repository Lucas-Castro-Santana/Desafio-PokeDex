import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getpokemons();
  }

  //Get Pokemons
  getpokemons(){
      this.dataService.getPokemons(12, this.page - 1)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
      
      response.results.forEach(result  =>  {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) =>{
          this.pokemons.push(uniqResponse);
           console.log(this.pokemons);
         });
       });
    });
  }

}
