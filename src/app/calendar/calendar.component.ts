import { Component, OnInit } from '@angular/core';
import { IAppointment } from '../shared/model/appointment';
import { IWeekDay } from '../shared/model/weekday';
import { ISimpleSchedule } from '../shared/model/simple-schedule';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEventComponent } from '../shared/components/dialog-add-event/dialog-add-event.component';
import { IDeleteAppointmentData } from '../shared/model/delete-appointment-data';
import { CalendarService } from '../shared/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: IWeekDay[] = [];
  schedules: ISimpleSchedule[] = [];

  constructor(
    private calendarService: CalendarService,
    private dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.generateStructures();
  }

  generateStructures() {
    this.calendarService.generateSimpleSchedules(this.schedules);
    this.calendarService.generateWeekDays(this.weekDays, this.currentDate);
    this.calendarService.generateWeekdaySchedules(this.weekDays);
  }

  addAppointment(currentSchedule: Date, currentDate: Date, title: string) {
    this.calendarService.addAppointment(this.weekDays, currentSchedule, currentDate, title);
  }

  drop(event: CdkDragDrop<IAppointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddEventComponent, {
      width: '30%',
      minWidth: '350px',
      data: this.schedules
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const dt = new Date(new Date().setHours(result.time));
        this.addAppointment(dt, result.date, result.title);
      }      
    });
  }

  deleteAppointment(deletionData: IDeleteAppointmentData) {
    deletionData.schedule.appointments.splice(deletionData.index, 1);
  }

  handleDateOutput(event: Date) {
    this.currentDate = event;
    this.schedules = [];
    this.weekDays = [];
    this.generateStructures();
  }
}
