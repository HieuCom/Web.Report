import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BanHangComponent } from '../BanHang/banhang.component';

@Component({
  selector: 'app-kho-dialog',
  templateUrl: './kho-dialog.component.html',
  styleUrls: ['./kho-dialog.component.css']
})
export class KhoDialogComponent implements OnInit {

  @Output() khoSelected = new EventEmitter<number>();
  danhSachKho: any[];

  
 

  constructor(private dataService: DataService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    //this.loadDanhSachKho();
    this.loadDataKho();
   
  }

  async loadDataKho() {
  
    try {
    
      const response: any = await this.dataService.getKho('/Kho', 
      ).toPromise();
      this.danhSachKho = response;
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
  }

  

  public columnInfonhapkho: any[] = [
    {
      "Name": "ID_KHO",
      "Caption": "ID",
      "Width": 80,
      "Format": ""
    },
    {
      "Name": "MA_KHO",
      "Caption": "Mã Kho",
      "Width": 80,
      "Format": ""
    },
    {
      "Name": "TEN_KHO",
      "Caption": "Tên Kho",
      "Width": 80,
      "Format": ""
    },
   
     
    
      
      
    
  ]

  chonKho(maKho: string) {
    const selectedKho  = this.danhSachKho.find(
      kho => kho.MA_KHO === maKho
    );
   // console.log(selectedKho);
    if (selectedKho) {
      this.khoSelected.emit(
        selectedKho
      );
    }
  }
}