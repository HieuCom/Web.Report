import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BanHangComponent } from '../BanHang/banhang.component';

@Component({
  selector: 'app-nguonluc-dialog',
  templateUrl: './nguonluc-dialog.component.html',
  styleUrls: ['./kho-dialog.component.css']
})
export class NguonLucDialogComponent implements OnInit {

  @Output() khoSelected = new EventEmitter<number>();
  danhSachKho: any[];
  public searchTerm: string = '';

  
 

  constructor(private dataService: DataService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    //this.loadDanhSachKho();
    this.loadDataKho();
   
  }

  async loadDataKho() {
  
    try {
    
      const response: any = await this.dataService.getKho('/NguonLuc', 
      ).toPromise();
      this.danhSachKho = response;
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
  }

  

  public columnInfonhapkho: any[] = [
    {
      "Name": "ID_NL",
      "Caption": "ID",
      "Width": 80,
      "Format": ""
    },
    {
      "Name": "MA_NL",
      "Caption": "Mã nguồn lực",
      "Width": 80,
      "Format": ""
    },
    {
      "Name": "TEN_NL",
      "Caption": "Tên nguồn lực",
      "Width": 80,
      "Format": ""
    },
   
     
    
      
      
    
  ]

  chonKho(maKho: string) {
    const selectedKho = this.danhSachKho.find(kho => kho.MA_NL === maKho);
    if (selectedKho) {
      this.khoSelected.emit(selectedKho.ID_NL);
    }
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  
  filterDanhSachKho() {
    if (!this.searchTerm) {
      this.loadDataKho(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachKho = this.danhSachKho.filter(kho =>
        this.normalizeString(kho.TEN_NL).includes(normalizedSearchTerm)
      );
    }
  }
}