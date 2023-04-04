import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const welcomeRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
]

@NgModule({
  declarations: [ WelcomeComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(welcomeRoutes),
    SharedModule
  ]
})
export class WelcomeModule { }
