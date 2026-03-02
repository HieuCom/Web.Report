import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-printtk',
  templateUrl: './printtk.html',
  styleUrls: ['./printtk.component.css']
})
export class PrintTKComponent implements OnInit {
  public fromDate: string ='';
  public toDate: string = '';
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  
  public nametable :string ;

safeHtml: SafeHtml;
htmlString: string;
htmlStringTable: string;


   

  constructor(private _dataService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService) {

     
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);


  
    //get param from component

    this.route.queryParams.subscribe(params => {
      this.fromDate =params['fromDate']
      this.toDate = params['toDate']
      this.nametable = params['nametable']
      // .split('-').reverse().join('/')
     
    });

    this.chungtus = history.state.chungtus;
    this.chungtus.sort((a, b) => (a.MA_NHOM_NL > b.MA_NHOM_NL) ? 1 : ((b.MA_NHOM_NL > a.MA_NHOM_NL) ? -1 : 0));
    //this.loadData();

    this.htmlStringTable = `  
  
    <div class="table-responsive">
    <h2 class="nametb" >${this.nametable}</h2>
    <p class="time" >Từ ngày:${ this.fromDate.split('-').reverse().join('/') } đến ngày: ${ this.toDate.split('-').reverse().join('/') } </p>
  <!--   
    <div class="caption" > 
      <div class="total"  >Tổng cộng</div>
      <div  >327.000.000</div>
      <div >1.327.000.000</div>
      <div >327.000.000</div>
      <div>327.000.000</div>
    </div> -->
  
    <table class="table table-bordered">
     
      <thead>
        <tr>
          <th rowspan="2"  class="small-column">Mã HH,VT</th>
          <th rowspan="2" class="small-column">Tên HH,VT</th>
          <th rowspan="2" class="small-column">
            ĐVT
          </th>
           <th colspan="2" style="text-align: center;" class="large-column">Đầu kỳ</th>
           <th colspan="2"  style="text-align: center;" class="large-column">Nhập trong kỳ</th>
           <th colspan="2"  style="text-align: center;" class="large-column">Xuất trong kỳ</th>
           <th colspan="2"  style="text-align: center;" class="large-column">Tồn cuối kỳ</th>
        </tr>
  
        <tr>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th>Số lượng</th>
          <th>Tiền</th>
      </tr>
      </thead>
      <tbody>
  
        <!-- tên nhóm vật tư -->
    <ng-container *ngFor="let chungtu of chungtus ; let i = index">
      
      <!-- Thêm hàng mới để hiển thị tên nhóm -->
      <tr *ngIf="i == 0 || chungtus[i].MA_NHOM_NL != chungtus[i-1].MA_NHOM_NL">
        <td><strong>{{ chungtu.MA_NHOM_NL }} </strong> </td>
          <td>Số lượng</td>
          <td></td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'LUONG_DK') |number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'TIEN_DK')|number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'LUONG_NHAP') |number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'TIEN_NHAP')|number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'LUONG_XUAT') |number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'TIEN_XUAT')|number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'LUONG_TON') |number }}</td>
          <td>{{ getTotal(chungtus, chungtu.MA_NHOM_NL,'TIEN_TON')|number }}</td>
      </tr>
  
      <!-- Hiển thị thông tin của từng mục -->
      <tr class="select-item">
        <td *ngFor="let colInfo of columnInfonhapkho">
          <strong *ngIf="chungtu.BOLD == true && colInfo.Format == 'd' ">{{chungtu[colInfo.Name] | date:'dd/MM/yyyy'}}</strong>
          <span *ngIf="chungtu.BOLD != true && colInfo.Format == 'd' ">{{chungtu[colInfo.Name] | date:'dd/MM/yyyy'}}</span>
          
          <strong *ngIf="chungtu.BOLD == true && colInfo.Format == '#,##0.##;(#,##0.##);#' ">{{chungtu[colInfo.Name]|number }}</strong>
          <span *ngIf="chungtu.BOLD != true && colInfo.Format == '#,##0.##;(#,##0.##);#' ">{{chungtu[colInfo.Name]|number }}</span>
          
          <strong *ngIf="chungtu.BOLD == true && colInfo.Format == '' ">{{chungtu[colInfo.Name] }}</strong>
          <span *ngIf="chungtu.BOLD !=  true && colInfo.Format == '' ">{{chungtu[colInfo.Name] }}</span>
        </td>
      </tr>
  
    </ng-container>
  
      </tbody>
    </table>
  
  
    
   
   
  </div>`;

    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlStringTable);
    this.htmlString = this.safeHtml.toString();
  }

  
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.MA_NHOM_NL === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
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

  public columnInfonhapkho: any[] = [
    {
      "Name": "MA_NL",
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

   // Define your HTML string here
 
  

}