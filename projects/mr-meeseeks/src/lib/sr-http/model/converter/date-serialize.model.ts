import {TransformOptions} from "class-transformer";
import {isDate, isNullOrUndefined, toFirstHour, toMoment} from "../../../sr-utils";
import * as moment from "moment";

const DATE_PATTERN = "YYYY-MM-DDTHH:mm:ss.SSSZZ";

export class DateSerialize {
  public static readonly conf: TransformOptions = {toPlainOnly: true};

  static serialize(date: Date, pattern?: string): string {
    if (isNullOrUndefined(date)) {
      return null;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }
    return moment(date).format(pattern);
  }
}

export class DateDeserialize {
  public static readonly conf: TransformOptions = {toClassOnly: true};

  static deserialize(date: any, pattern?: string): Date {
    if (isNullOrUndefined(date) || date === "") {
      return null;
    }
    if (isDate(date)) {
      return date as Date;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }

    const current = moment(date, pattern);

    if (!current.isValid()) {
      return null;
    }

    return current.toDate();
  }
}

export class DefaultDatePattern {
  static readonly yyyyMMddTHHmmssSSSZ: string = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
  static readonly yyyyMMdd: string = "yyyy-MM-dd";
  static readonly HHmmss: string = "HH:mm:ss";
  static readonly HHmm: string = "HH:mm";
}

export function isToday(date: Date): boolean {
  return toMoment(toFirstHour(date)).isSame(toMoment(toFirstHour(new Date())));
}
