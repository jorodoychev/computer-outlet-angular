import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from "./error/error.component";
import {MainComponent} from "./post/main/main.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/catalog' },
  { path: 'catalog', component: MainComponent },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
