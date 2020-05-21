import moment from "moment-es6";
import {isDate, isNullOrUndefined} from "./sr-commons.model";

export function formatDate(date: Date | moment.Moment, pattern: string): string {
  return toMoment(date).format(pattern);
}

export function parseDate(date: string | Date, pattern: string): Date {
  if (isDate(date)) {
    return date as Date;
  }
  const current = moment(date as string, pattern);
  if (!current.isValid()) {
    throw new Error("Error. date =>" + date + ", pattern =>" + pattern);
  }
  return current.toDate();
}

export function isValidMoment(date: moment.Moment): boolean {
  return date.isValid();
}

export function isValidDate(date: Date): boolean {
  return isValidMoment(toMoment(date));
}

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

export function isBetween(date: Date | moment.Moment, dtIni: Date | moment.Moment, dtEnd: Date | moment.Moment): boolean {
  return toMoment(date).isSameOrAfter(dtIni) && toMoment(date).isSameOrBefore(dtEnd);
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
