import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
@Component({
  selector: 'app-hdmv',
  templateUrl: './hoadonmuavao.component.html',
  styleUrls: ['./hoadonmuavao.component.css']
})
export class HoaDonMuaVaoComponent implements OnInit {

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
  public nametable= 'Bảng kê hóa đơn mua vào';

  public ID_KHO: number = 0;

  public ma_tk: number = 1331 ;
 



  bsModalRef: BsModalRef;
  
  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
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
    
      const response: any = await this.dataService.postCanDoiKeToan('/HoaDonMuaVao', 
      { TU_NGAY:this.getNowUTC(this.fromDate), DEN_NGAY : this.getNowUTC(this.toDate), MA_TK : this.ma_tk

      }).toPromise();
      this.nhapkhos = response;
      this.nhapkhos.sort((a, b) => (a.TEN_NHOM_VAT > b.TEN_NHOM_VAT) ? 1 : ((b.TEN_NHOM_VAT > a.TEN_NHOM_VAT) ? -1 : 0))
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
 
  }

  chuyen(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate':this.fromDate.toISOString().slice(0, 10),
        'toDate':this.toDate.toISOString().slice(0, 10),
        'nametable': this.nametable,
  
        
      } ,
      state: {
        chungtus: this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
      }
    };
    this.router.navigate(['/main/inventory/printHDMV'], navigationExtras);
   
    
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
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
      "Name": "TEN_NHOM_VAT",
      "Caption": "Tên nhóm thuế ",
      "Width": 400,
      "Format": ""
    },
    {
      "Name": "MAU_SO",
      "Caption": "Mẫu số",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "SO_SERI",
      "Caption": "Ký hiệu",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "SO_CT",
      "Caption": "Số chứng từ",
      "Width": 100,
      "Format": ""
    },
    {
      "Name": "NGAY_CT",
      "Caption": "Ngày CT",
      "Width": 90,
      "Format": "d"
    },
    {
      "Name": "SO_HD",
      "Caption": "Số hóa đơn",
      "Width": 90,
      "Format": ""
    },
    {
        "Name": "NGAY_HD",
        "Caption": "Ngày HD",
        "Width": 50,
        "Format": "d"
      },
      {
        "Name": "TEN_KH_HD",
        "Caption": "Tên KH",
        "Width": 150,
        "Format": ""
      },

      {
        "Name": "MS_THUE",
        "Caption": "Mã số thuế",
        "Width": 90,
        "Format": ""
      },

      {
        "Name": "TEN_HANG",
        "Caption": "Tên hàng",
        "Width": 200,
        "Format": ""
      },
      {
        "Name": "TIEN_TRTHUE",
        "Caption": "Tiên trước thuế",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "",
        "Caption": "Thuế suất",
        "Width": 50,
        "Format": ""
      },
      {
        "Name": "TIEN_VAT",
        "Caption": "Tiền VAT",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "DIEN_GIAI",
        "Caption": "Diễn giải",
        "Width": 150,
        "Format": ""
      },
      
      
    
  ]
  
}
