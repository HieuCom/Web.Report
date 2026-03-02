import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColuminfoService {

  private columnInfoSource = new BehaviorSubject(null);
  currentColumnInfo = this.columnInfoSource.asObservable();

  constructor() { }

  changeColumnInfo(columnInfo: any[]) {
    this.columnInfoSource.next(columnInfo);
  }
}
