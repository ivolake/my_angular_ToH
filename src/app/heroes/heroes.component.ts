import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { generateID } from '../in-memory-data.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  filter_value = '';
  heroes_list: Hero[];
  displayedColumns: string[] = ['id', 'name', 'details'];
  mat_table_heroes_list;
  @ViewChild(MatSort) sort: MatSort;
  selectedHero: Hero = {
    id: 1245,
    name: 'Example'
  };

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  applyFilter(filterValue: string) {
    this.mat_table_heroes_list.filter = filterValue.trim().toLowerCase();
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes_list.push(hero);
        this.mat_table_heroes_list = new MatTableDataSource(this.heroes_list);
        this.mat_table_heroes_list.sort = this.sort;
      });
  }
  delete(hero: Hero): void {
    this.heroes_list = this.heroes_list.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(heroes => {
      this.mat_table_heroes_list = new MatTableDataSource(this.heroes_list);
      this.mat_table_heroes_list.sort = this.sort;
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => { 
      // console.log(heroes)
      this.heroes_list = heroes 
      this.mat_table_heroes_list = new MatTableDataSource(this.heroes_list);
      this.mat_table_heroes_list.sort = this.sort;
    } );
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}