import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ButtonAddEventComponent } from '../shared/components/button-add-event/button-add-event.component';
import { CalendarService } from '../shared/services/calendar.service';


const calendarRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
]

@NgModule({
  declarations: [ CalendarComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(calendarRoutes),
    SharedModule,
    ButtonAddEventComponent
  ],
  providers: [ CalendarService ]
})
export class CalendarModule { }
