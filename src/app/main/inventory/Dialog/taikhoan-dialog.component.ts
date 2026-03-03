import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-taikhoan-dialog',
  templateUrl: './taikhoan-dialog.component.html',
  styleUrls: ['./kho-dialog.component.css']
})
export class TaiKhoanDialogComponent implements OnInit {

  @Output() taikhoanSelected = new EventEmitter<number>();
  danhSachTaiKhoan: any[];
  public searchTerm: string = '';

  
 

  constructor(private dataService: DataService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    //this.loadDanhSachTaiKhoan();
    this.loadDataTaiKhoan();
  }

  async loadDataTaiKhoan() {
    try {

      const response: any = await this.dataService.get('/TaiKhoan', 
      ).toPromise();
      this.danhSachTaiKhoan = response;
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
  }

  

  public columnInfonhapTaiKhoan: any[] = [
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

  chonTaiKhoan(maTaiKhoan: string) {
    const selectedTaiKhoan = this.danhSachTaiKhoan.find(TaiKhoan => TaiKhoan.MA_TK === maTaiKhoan);
    if (selectedTaiKhoan) {
      this.taikhoanSelected.emit(selectedTaiKhoan.MA_TK);
    }
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  
  filterDanhSachTaiKhoan() {
    if (!this.searchTerm) {
      this.loadDataTaiKhoan(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachTaiKhoan = this.danhSachTaiKhoan.filter(TaiKhoan =>
        this.normalizeString(TaiKhoan.TEN_TK).includes(normalizedSearchTerm)
      );
    }
  }
}