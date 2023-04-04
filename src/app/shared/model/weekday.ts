import { WeekDay } from "@angular/common";
import { ISchedule } from "./schedule";

export interface IWeekDay {
    day: WeekDay,
    description: string,
    date: Date,
    schedules: ISchedule[]
}