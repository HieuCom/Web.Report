import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BanHangComponent } from '../BanHang/banhang.component';

@Component({
  selector: 'app-taikhoan-dialog',
  templateUrl: './taikhoan-dialog.component.html',
  styleUrls: ['./kho-dialog.component.css']
})
export class TaiKhoanDialogComponent implements OnInit {

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
    
      const response: any = await this.dataService.getKho('/TaiKhoan', 
      ).toPromise();
      this.danhSachKho = response;
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
  }

  

  public columnInfonhapkho: any[] = [
    {
      "Name": "MA_TK",
      "Caption": "Mã TK",
      "Width": 80,
      "Format": ""
    },
  
    {
      "Name": "TEN_TK",
      "Caption": "Tên tài khoản",
      "Width": 80,
      "Format": ""
    },
   
     
    
      
      
    
  ]

  chonKho(maKho: string) {
    const selectedKho = this.danhSachKho.find(kho => kho.MA_TK === maKho);
    if (selectedKho) {
      this.khoSelected.emit(selectedKho.MA_TK);
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
        this.normalizeString(kho.TEN_TK).includes(normalizedSearchTerm)
      );
    }
  }
}