import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(statusId: number): string {
    if (statusId == 1) {
      return this.translate.instant('task_manager_status_created');
    } else if (statusId == 2) {
      return this.translate.instant('task_manager_status_process');
    } else if (statusId == 4) {
      return this.translate.instant('task_manager_status_finish');
    }
  }
}

@Pipe({
  name: 'priorityPipe'
})
export class PriorityPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(statusId: number): string {
    if (statusId == 1) {
      return this.translate.instant('task_manager_task_priority_low');
    } else if (statusId == 2) {
      return this.translate.instant('task_manager_task_priority_medium');
    } else {
      return this.translate.instant('task_manager_task_priority_high');
    }
  }
}

@Pipe({
  name: 'currencyPipe'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === 'number' && value) {
      let n = 2;
      if (value % 1 === 0) {
        n = 0;
      }
      const re = '\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')';
      return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
      // return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }
    return 0;
  }
}

@Pipe({
  name: 'datetimePipe'
})
export class DatetimePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (Object.prototype.toString.call(value) === "[object Date]") {
      return super.transform(value, 'dd/MM/yyyy');
    }
    const date = Date.parse(value);
    if (date) {
      return super.transform(date, 'dd/MM/yyyy');
    }
    return value;
  }
}

@Pipe({
  name: 'datetimePipeEvent'
})
export class DatetimePipeEvent extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      value = new Date(value);
      let time = value.toLocaleTimeString();
      let month = value.getMonth() + 1;
      let date = value.getDate();
      return date + " tháng " + month + " lúc " + time;
    }
  }
}

@Pipe({
  name: 'numberPipe'
})
export class NumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let n = 2;
      if (value % 1 === 0) {
        n = 0;
      }
      const re = '\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')';
      return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
      // return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }
    return '';
  }
}

@Pipe({ name: 'jsonToArray' })
export class JsonToArrayPipe implements PipeTransform {
  transform(value, skip?: any): any {
    let keys = [];
    for (let key in value) {
      if (key !== skip)
        keys.push({ key: key, obj: value[key] });
    }
    return keys;
  }
}

@Pipe({
  name: 'subctiptionTypePipe'
})
export class SubctiptionTypePiPe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(statusId: number): string {
    if (statusId == 1) {
      return this.translate.instant('OnScreen');
    } else if (statusId == 2) {
      return this.translate.instant('SMS');
    } else if (statusId == 4) {
      return this.translate.instant('Email');
    } else {
      return this.translate.instant('None');
    }
  }
}