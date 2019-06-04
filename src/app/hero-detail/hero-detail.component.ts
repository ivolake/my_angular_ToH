import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
// import { generateID } from '../in-memory-data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  heroes: Hero[];
  


  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack()); // () => this.goBack()
  }

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  // findHerobyID(newHero){
  //   return newHero.id === this;
  // }

  // getHero(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  //   this.hero = this.heroes.find(this.findHerobyID, id)
  // }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
}
