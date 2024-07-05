import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NhapKhoComponent } from '../NhapKho/nhapkho.component';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
@Component({
  selector: 'app-nhapxuattonkho-list',
  templateUrl: './hoatdong-list.component.html',
  styleUrls: ['./hoatdong-list.component.css']
})
export class NhapXuatTonKhoComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef; 
  
  public  isDateRangeVisible: boolean = false;
  public  isAccVisible: boolean = false;
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
  public nametable= 'BÁO CÁO NHẬP XUẤT TỒN KHO';
  public ma_tk: string;

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
      const response: any = await this.dataService.postCanDoiKeToan('/NhapXuatTon', 
      { TU_NGAY:this.getNowUTC(this.fromDate),
        DEN_NGAY: this.getNowUTC(this.toDate),
        TU_NGAY_TR:this.getNowUTC(this.fromDateTR), 
        DEN_NGAY_TR:this.getNowUTC(this.toDateTR) }).toPromise();
      this.nhapkhos = response;
      this.nhapkhos.sort((a, b) => (a.MA_NHOM_NL > b.MA_NHOM_NL) ? 1 : ((b.MA_NHOM_NL > a.MA_NHOM_NL) ? -1 : 0));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  chuyen(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate':this.fromDate.toISOString().slice(0, 10),
        'toDate':this.toDate.toISOString().slice(0, 10),
        'nametable': this.nametable
      } ,
      state: {
        chungtus: this.nhapkhos
      }
    };
    this.router.navigate(['/main/inventory/printTK'], navigationExtras);
    
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
      "Name": "MA_NHOM_NL",
      "Caption": "Mã Nhóm NL",
      "Width": 50,
      "Format": ""
    },
    {
        "Name": "MA_NL",
        "Caption": "Mã HH'VT",
        "Width": 50,
        "Format": ""
      },
    {
      "Name": "TEN_NL",
      "Caption": "Tên Hàng Hóa ,Vật Tư ", 
      "Width": 70,
      "Format": ""
    },
    {
      "Name": "TEN_DVT",
      "Caption": "Đơn Vị Tính",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "LUONG_DK",
      "Caption": "Lượng Đầu Kỳ",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_DK",
      "Caption": "Tiền Đầu Kỳ",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
        "Name": "LUONG_NHAP",
        "Caption": "Lượng nhập",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TIEN_NHAP",
        "Caption": "Tiền nhập",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "LUONG_XUAT",
        "Caption": "Lượng xuất",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "TIEN_XUAT",
        "Caption": "Tiền xuất",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "LUONG_TON",
        "Caption": "Lượng tồn",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },

      {
        "Name": "TIEN_TON",
        "Caption": "Lượng tồn",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
    
  ]
  
}
