import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
@Component({
  selector: 'app-sochitiettk',
  templateUrl: './hoatdong-list.component.html',
  styleUrls: ['./hoatdong-list.component.css']
})
export class SoChiTietTKComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef; 
  
  public  isDateRangeVisible: boolean = false;
  public  isAccVisible: boolean = true;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public ma_tk: string;

  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();

  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public nhapkhos: any[];
  public nametable= 'Sổ Chi Tiết Tài khoản';

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
    
      const response: any = await this.dataService.postCanDoiKeToan('/SoChiTietTaiKhoan', 
      { TU_NGAY:this.getNowUTC(this.fromDate), 
        DEN_NGAY : this.getNowUTC(this.toDate), 
        MA_TK : this.ma_tk

      }).toPromise();
      this.nhapkhos = response;
      console.log(this.nhapkhos.length);
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
        'ma_tk': this.ma_tk,
      } ,
      state: {
        chungtus: this.nhapkhos
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
      "Width": 80,
      "Format": "d"
    },
    {
        "Name": "SO_CT",
        "Caption": "Số chứng từ",
        "Width": 80,
        "Format": ""
      },
      {
        "Name": "DIEN_GIAI",
        "Caption": "Diễn giải", 
        "Width": 70,
        "Format": ""
      },
      {
        "Name": "MA_TK_DU",
        "Caption": "TK Đ/Ứng",
        "Width": 80,
        "Format": ""
      },
      {
        "Name": "PS_NO",
        "Caption": "Phát sinh nợ",
        "Width": 90,
        "Format": "#,##0.##;(#,##0.##);#"
      },
      {
        "Name": "PS_CO",
        "Caption": "Phát sinh có",
        "Width": 100,
        "Format": "#,##0.##;(#,##0.##);#"
      }
    
    
  ]
  
}
