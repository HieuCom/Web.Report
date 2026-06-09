import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
@Component({
  selector: 'app-sonhatkychung',
  templateUrl: './hoatdong-list.component.html',
  styleUrls: ['./hoatdong-list.component.css']
})
export class SoNhatKyChungComponent implements OnInit {

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
  public Taikhoans: any;
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public chungtus: any[];
  public nametable= 'Sổ Nhật Ký Chung';

  bsModalRef: BsModalRef;
  public ma_tk: string;
  
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
    this.columnInfoService.changeColumnInfo(this.columnInfo);
  }
  private getNowUTC(now : Date ) {
   
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  async loadData() {
  
    try {
    
      const response: any = await this.dataService.postCanDoiKeToan('/SoNhatKyChung', 
      { TU_NGAY:this.getNowUTC(this.fromDate), DEN_NGAY : this.getNowUTC(this.toDate)}).toPromise();
      this.chungtus = response;
      console.log(this.chungtus.length);
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
        chungtus: this.chungtus
      }
    };
    this.router.navigate(['/main/inventory/printCDKT'], navigationExtras);
    
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
  openDialog() {
    
  }
  

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  public columnInfo: any[] = [
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
      "Name": "MA_TK",
      "Caption": "Mã tài khoản",
      "Width": 50,
      "Format": ""
    },
   
      {
        "Name": "TEN_TK",
        "Caption": "Tên tài khoản",
        "Width": 70,
        "Format": ""
      },
      {
        "Name": "PS_NO",
        "Caption": "Phát sinh nợ",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "PS_CO",
        "Caption": "Phát sinh có",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "PS_NO_NT",
        "Caption": "Phát sinh nợ(NT)",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "PS_CO_NT",
        "Caption": "Phát sinh có(NT)",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "ONG_BA",
        "Caption": "Ông bà",
        "Width": 100,
        "Format": ""
      },
      {
        "Name": "MA_DT",
        "Caption": "Mã đối tượng",
        "Width": 50,
        "Format": ""
      },
      {
        "Name": "TEN_DT",
        "Caption": "Tên đối tượng",
        "Width": 100,
        "Format": ""
      },
    {
      "Name": "DIEN_GIAI",
      "Caption": "Diễn giải", 
      "Width": 200,
      "Format": ""
    },
    {
      "Name": "mDIEN_GIAI",
      "Caption": "Diễn giải tổng", 
      "Width": 200,
      "Format": ""
    }    
  ]

} 
