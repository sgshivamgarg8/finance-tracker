import { DateObj } from '../models/date.model';

export class AppDate {
  /**
   * Get Date form Date object
   *
   * e.g. { day: 4, month: 5, year:2024 } => Date
   *
   * @static
   * @param {DateObj} dateObj
   * @returns {Date}
   */
  static getDateFromDateObj(dateObj: DateObj): Date {
    if (dateObj === null || dateObj === undefined) {
      throw new Error('dateObj is undefined or null');
    }

    return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
  }

  /**
   * Get Date object from Date
   *
   * e.g. Date => { day: 4, month: 5, year:2024 }
   *
   * @static
   * @param {Date} date
   * @returns {DateObj}
   */
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
