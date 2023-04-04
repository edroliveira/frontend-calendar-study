import { Injectable } from '@angular/core';
import { IWeekDay } from '../model/weekday';
import { of, filter, map } from 'rxjs';
import { ISchedule } from '../model/schedule';
import { WeekDay } from '@angular/common';
import { ISimpleSchedule } from '../model/simple-schedule';

@Injectable()
export class CalendarService {

  // populates the basic schedules array of the calendar
  generateSimpleSchedules(schedules: ISimpleSchedule[]) {
    for (let i = 1; i <= 24; i++) {
      schedules.push({
        time: i,
        description: i <= 12 ? i + ':00 am' : i - 12 + ':00 pm',
      });
    }
  }

  // populates the array of week days using the WeekDay enum pattern
  public generateWeekDays(weekDays: IWeekDay[], currentDate: Date) {
    of(0, 1, 2, 3, 4, 5, 6)
      .pipe(
        map((value) => {
          const sunday = this.getSunday(currentDate);
          const wd: IWeekDay = {
            day: value,
            description: WeekDay[value],
            date: new Date(sunday.setDate(sunday.getDate() + value)),
            schedules: [],
          };
          return wd;
        })
      )
      .subscribe((wd) => weekDays.push(wd));
  }

  // populates the array of schedules for each week day
  public generateWeekdaySchedules(weekDays: IWeekDay[]) {
    weekDays.map((weekDay) => {
      for (let i = 1; i <= 24; i++) {
        of(i)
        .pipe(
          map((value) => {
            const sch: ISchedule = {
              date: weekDay.date,
              time: new Date(weekDay.date.setHours(value)),
              description: value + ':00',
              appointments: [],
            };
            return sch;
          })
        )
        .subscribe((schedule) => weekDay.schedules.push(schedule)); 
      }
    });
  }

  public addAppointment(
    weekDays: IWeekDay[],
    currentSchedule: Date,
    currentDate: Date,
    title: string
  ) {
    weekDays.map((weekDay) =>
      weekDay.schedules.map((schedule) => {
        schedule.date.setHours(0);
        of(schedule)
          .pipe(
            filter(
              (sch) =>
                this.compareDates(sch.date, currentDate) &&
                sch.time.getHours() === currentSchedule.getHours()
            )
          )
          .subscribe((s) => {
            s.appointments.push({
              date: new Date(currentDate.setHours(currentSchedule.getHours())),
              id: currentSchedule.getHours(),
              title: title,
            });
          });
      })
    );
  }

  // gets the first day of the week
  private getSunday(dt: Date) {
    const date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    return new Date(date.setDate(date.getDate() - date.getDay()));
  }

  private compareDates(firstDate: Date, secondDate: Date) {
    return this.formatDateToInternational(firstDate) === this.formatDateToInternational(secondDate);
  }

  private formatDateToInternational(date: Date): string {
    const isoDate = date.toISOString();
    return isoDate.split('T', 1)[0];
  }
}
