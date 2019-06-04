import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminGuard } from './admin/admin.guard';


const routes: Routes = [
  // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '', component: MainMenuComponent, canActivate: [AdminGuard] },
  { path: 'heroes', component: HeroesComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AdminGuard] },
  { path: 'search', component: HeroSearchComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginFormComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {

 }