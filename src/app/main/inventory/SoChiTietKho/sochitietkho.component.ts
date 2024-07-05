import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { KhoDialogComponent } from '../Dialog/kho-dialog.component';
import { NguonLucDialogComponent } from '../Dialog/nguonluc-dialog.component';


@Component({
  selector: 'app-sochitietkho',
  templateUrl: './sochitietkho.component.html',
  styleUrls: ['./sochitietkho.component.css']
})
export class SoChiTietKhoComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef; 
  
  public  isDateRangeVisible: boolean = false;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();

  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public nhapkhos: any[];
  public danhSachKho: any[] = [];
  public nametable= 'SỔ CHI TIẾT HÀNG HÓA';

  public ID_KHO: number = 0;

  public ma_tk: number = 1331 ;
  public ma_kho: string = "23"  ;
  public ma_nl: string = "839"  ;

  public namekho: string ;
  public namewh: string ;



  bsModalRef: BsModalRef;
  
  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private sharedDataService: SharedDataService,
   
    private modalService: BsModalService) { }
   


  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.updateColumnInfo();
    this.loadData();
    
  }

  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfonhapkho);
  }
  private getNowUTC(now : Date ) {
   
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  async loadData() {
  
    try {
    
      const response: any = await this.dataService.postCanDoiKeToan('/SoChiTietKho', 
      { 
        TU_NGAY:this.getNowUTC(this.fromDate), 
        DEN_NGAY : this.getNowUTC(this.toDate),
        ID_DV:"1",
        ID_KHO:this.ma_kho,    
        ID_NHOM_NL:"0",
        ID_NL:this.ma_nl,
        BIT_LOAI_NL: 0,
        ID_HDONG: 0,
        ID_LO: 0

      }).toPromise();
      this.nhapkhos = response;
      this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
  }

  

  chuyen(){
    let navigationExtras: NavigationExtras = {
      state: {
        chungtus: this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
      }
    };

    const data = {
      fromDate: this.fromDate.toISOString().slice(0, 10),
      toDate: this.toDate.toISOString().slice(0, 10),
      nametable: this.nametable,
      chungtus: this.nhapkhos,
      ma_kho: this.ma_kho,
      ma_nl: this.ma_nl
    };

    

    this.sharedDataService.updateData(data);
    this.router.navigate(['/main/inventory/printSCTK'], navigationExtras);
   
    
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
}

openKhoDialog() {
  const dialogRef = this.modalService.show(KhoDialogComponent);
  dialogRef.content.khoSelected.subscribe((idKho: string) => {
    this.ma_kho = idKho;
    // Close the dialog if needed
    dialogRef.hide();
  });
}

openNLDialog() {
  const dialogRef = this.modalService.show(NguonLucDialogComponent);
  dialogRef.content.khoSelected.subscribe((idKho: string) => {
    this.ma_nl = idKho;
    // Close the dialog if needed
    dialogRef.hide();
  });
}






  onValueChangeDateRange(rangeDate) {
    if (rangeDate != undefined) {
      this.fromDate = rangeDate;
      this.loadData();
    }
  }
  onValueChangeDateRange2(rangeDate2) {
    if (rangeDate2 != undefined) {
      this.toDate = rangeDate2;
      this.loadData();
    }
  }
  
  reloaddata() {
    this.loadData();
  }
  

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }



  
  public columnInfonhapkho: any[] = [
   
    {
      "Name": "NGAY_CT",
      "Caption": "Ngày CT",
      "Width": 50,
      "Format": "d"
    },
   
    {
      "Name": "SO_CT",
      "Caption": "Số chứng từ",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "DIEN_GIAI",
      "Caption": "Diễn giải",
      "Width": 50,
      "Format": ""
    },
  
      {
        "Name": "SO_LUONG",
        "Caption": "Số lượng",
        "Width": 30,
        "Format": ""
      },
      {
        "Name": "GIA_VON",
        "Caption": "Giá",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TIEN_VON",
        "Caption": "Tiền",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },

      {
        "Name": "SO_LUONG_NHAP",
        "Caption": "Số lượng nhập",
        "Width": 30,
        "Format": ""
      },

      {
        "Name": "TIEN_NHAP",
        "Caption": "Tiền nhập",
        "Width": 30,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "SO_LUONG_XUAT",
        "Caption": "Số lượng xuất",
        "Width": 50,
        "Format": ""
      },
      {
        "Name": "TIEN_XUAT",
        "Caption": "Tiền xuất",
        "Width": 30,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TEN_KH_HD",
        "Caption": "Số lượng tồn",
        "Width": 30,
        "Format": ""
      },
      {
        "Name": "TEN_KH_HD",
        "Caption": "Tiền tồn",
        "Width": 30,
        "Format": "#,##0.##;(#,##0.##);#"
      },
     
    
      
      
    
  ]
  
}
