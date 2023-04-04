import { IAppointment } from "./appointment";

export interface ISchedule {
    date: Date,
    time: Date,
    description: string,
    appointments: IAppointment[]
}