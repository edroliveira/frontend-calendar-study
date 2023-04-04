import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IAppointment } from '../../model/appointment';
import { IWeekDay } from '../../model/weekday';
import { ISimpleSchedule } from '../../model/simple-schedule';
import { ISchedule } from '../../model/schedule';
import { IDeleteAppointmentData } from '../../model/delete-appointment-data';

@Component({
  selector: 'app-calendar-structure',
  templateUrl: './calendar-structure.component.html',
  styleUrls: ['./calendar-structure.component.css'],
})
export class CalendarStructureComponent {
  @Input() weekDays!: IWeekDay[];
  @Input() schedules!: ISimpleSchedule[];
  @Output() dropItem = new EventEmitter<CdkDragDrop<IAppointment[]>>();
  @Output() deleteItem = new EventEmitter<IDeleteAppointmentData>();

  emitDropEvent(event: CdkDragDrop<IAppointment[]>) {
    this.dropItem.emit(event);
  }

  emitDeleteAppointment(index: number, schedule: ISchedule) {
    const deletionData: IDeleteAppointmentData = {
      index: index,
      schedule: schedule
    }
    this.deleteItem.emit(deletionData);
  }
}
