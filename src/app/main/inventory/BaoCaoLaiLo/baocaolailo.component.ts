import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
@Component({
  selector: 'app-baocaolailo',
  templateUrl: './baocaolailo.component.html',
  styleUrls: ['./baocaolailo.component.css']
})
export class BaoCaoLaiLoComponent implements OnInit {

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
  public nametable= 'Báo Cáo Lãi Lỗ';

  public ID_KHO: number = 0;




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
    
      const response: any = await this.dataService.postCanDoiKeToan('/BaoCaoLaiLo', 
      { TU_NGAY:this.getNowUTC(this.fromDate), 
        DEN_NGAY : this.getNowUTC(this.toDate), 
        ID_DV:"1"
      }).toPromise();
      this.nhapkhos = response;
  
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
 
  }

  chuyen(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate':this.getNowUTC(this.fromDate).toISOString().slice(0, 10),
        'toDate':this.getNowUTC(this.toDate).toISOString().slice(0, 10),
        'nametable': this.nametable
      
      } ,
      state: {
        chungtus: this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
      }
    };
    this.router.navigate(['/main/inventory/printBCLL'], navigationExtras);
   
    
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
  




  
  public columnInfonhapkho: any[] = [
    {
      "Name": "MA_NL",
      "Caption": "MÃ HH",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TEN_NL",
      "Caption": "Tên Hàng",
      "Width": 50,
      "Format": ""
    },
    {
        "Name": "TEN_DVT",
        "Caption": "ĐVT",
        "Width": 50,
        "Format": ""
      },
      {
        "Name": "SO_LUONG",
        "Caption": "SL", 
        "Width": 70,
        "Format": ""
      },

      {
        "Name": "TIEN_VON",
        "Caption": "Tiền Vốn",
        "Width": 90,
        "Format": "#,##0.##;(#,##0.##);#"
      },

      {
        "Name": "TIEN_BAN",
        "Caption": "Doanh Thu",
        "Width": 50,
        "Format": "#,##0.##;(#,##0.##);#"
      }
      ,
      {
        "Name1": "TIEN_BAN",
        "Name2": "TIEN_VON",
        "Caption": "Lãi Lỗ",
        "Width": 50,
        "Format": "calc"
      }
  ]
 
  
}
