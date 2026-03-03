import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-candoiketoan',
  templateUrl: './cdkt.component.html',
  styleUrls: ['./cdkt.component.css']
})
export class CanDoiKeToanComponent2 implements OnInit {

    @ViewChild('dateRangeSection') dateRangeSection: ElementRef; 
  public  isDateRangeVisible: boolean = false;
  public  isAccVisible: boolean = false;

  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();
  public ma_tk: string;
  public Taikhoans: any;
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public nametable= 'BẢNG CÂN ĐỐI KẾ TOÁN';
  constructor(private _dataService: DataService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService) {
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.fromDate.setDate(1);
    this.toDate.setDate;

    this.updateColumnInfo();

    console.log(this.fromDate.toISOString().slice(0, 10),);   
    this.getUserIdLogin(user.username);
    this.loadData();
  }
  
   // update columnInfo to show in table
  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfo);
  }

  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspDoiTuong___FindUserName", "CommandType": 1025, "Parameters": data }
      await this._dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].ID_DT;
        }
      });
    }
  }
  private getNowUTC(now : Date ) {
   
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
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

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  async loadData() {
  
    try {
    
      const response: any = await this._dataService.postCanDoiKeToan('/CanDoiKeToan', 
      { TU_NGAY:this.getNowUTC(this.fromDate), DEN_NGAY : this.getNowUTC(this.toDate)}).toPromise();
      this.chungtus = response;
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
  openDialog() {
    
  }

  reloaddata() {
    console.log(this.fromDate.toISOString().slice(0, 10),);   
    this.loadData()
  }
  public columnInfo: any[] = [
    {
      "Name": "TEN_CHI_TIEU",
      "Caption": "Tên chỉ tiêu",
      "Width": 50,
      "Format": ""
    },

    {
      "Name": "MA_SO",
      "Caption": "Mã Số",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "THUYET_MINH",
      "Caption": "Thuyết Minh",
      "Width": 100,
      "Format": ""
    },

    
    {
      "Name": "SO_DU_DAU",
      "Caption": "Số Dư Đầu",
      "Format": "#,##0.##;(#,##0.##);#",
      "Width": 100
    },
    {
      "Name": "SO_DU_CUOI",
      "Caption": "Số Dư Cuối",
      "Width": 100,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "SO_DU_DAU_NT",
      "Caption": "Số Dư Đầu NT",
      "Format": "#,##0.##;(#,##0.##);#",
      "Width": 100
    },
    {
      "Name": "SO_DU_CUOI_NT",
      "Caption": "Số Dư Cuối NT",
      "Width": 100,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TU_NGAY",
      "Caption": "Từ Ngày",
      "Width": 50,
      "Format": "d"
     
    },
    {
      "Name": "DEN_NGAY",
      "Caption": "Đến Ngày",
      "Width": 50,
      "Format": "d"
    },
  ]
}