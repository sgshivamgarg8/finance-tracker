import { DateObj } from '../models/date.model';

export class AppDate {
  static getDateFromDateObj(dateObj: DateObj): Date {
    if (dateObj === null || dateObj === undefined) {
      throw new Error('dateObj is undefined or null');
    }

    return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  }

  static getDateObjFromDate(date: Date): DateObj {
    if (date === null || date === undefined) {
      throw new Error('date is undefined or null');
    }

    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }
}
