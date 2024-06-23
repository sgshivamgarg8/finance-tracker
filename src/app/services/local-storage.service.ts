import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ICache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: BehaviorSubject<any>;
}
type serializable = object;

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private cache: ICache;

  constructor() {
    this.cache = Object.create(null);
  }

  setItem<T extends serializable>(key: string, value: T): BehaviorSubject<T> {
    localStorage.setItem(key, JSON.stringify(value));

    if (this.cache[key]) {
      this.cache[key].next(value);
      return this.cache[key];
    }

    return (this.cache[key] = new BehaviorSubject(value));
  }

  getItem<T extends serializable>(key: string): BehaviorSubject<T> {
    if (this.cache[key]) {
      return this.cache[key];
    } else {
      const data = localStorage.getItem(key);
      if (!data) {
        // throw new Error(`${key} does not exist in local storage`);
        return (this.cache[key] = new BehaviorSubject<T>(JSON.parse('[]')));
      }
      return (this.cache[key] = new BehaviorSubject<T>(JSON.parse(data)));
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    if (this.cache[key]) this.cache[key].next(undefined);
  }
}
