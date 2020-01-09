import moment from "moment-es6";
import {isDate, isNullOrUndefined} from "./sr-commons.model";

export function toMoment(date: Date | moment.Moment): moment.Moment {
  return isDate(date) ? moment(date as Date) : date as moment.Moment;
}

export function toFirstHour(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0)
    .toDate();
}

export function toLastHour(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .hours(23)
    .minutes(59)
    .seconds(59)
    .milliseconds(999)
    .toDate();
}

export function toFirstDayOfMoth(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .startOf("month")
    .toDate();
}

export function toLastDayOfMoth(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .endOf("month")
    .toDate();
}

export function toFirstDayOfWeek(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .startOf("week")
    .toDate();
}

export function toLastDayOfWeek(date: Date | moment.Moment): Date {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .endOf("week")
    .toDate();
}


/**
 * Remove horas, minutos, segundo e milisegundos
 */
export function toDateOnly(date: moment.Moment | Date): moment.Moment {
  if (isNullOrUndefined(date)) return null;
  return toMoment(date)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
}
