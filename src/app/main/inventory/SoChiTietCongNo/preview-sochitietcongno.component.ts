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
  selector: 'app-printSCCN',
  templateUrl: './preview-sochitietcongno.component.html',
  styleUrls: ['./sochitietcongno.component.css']
})
export class PreviewSCCNComponent implements OnInit {
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public ma_tk: string ;
  
  public nametable :string ;
 

  
  public stringheadtable:string =`
  <tr>
           <th rowspan="2" class="small-column">
              Ngày
            </th>
            <th colspan="2" style="text-align: center;" class="large-column">
              SỐ CT
            </th>
       
            <th rowspan="2" class="small-column">
              DIỄN GIẢI
            </th>
           
            <th colspan="2" style="text-align: center;" class="large-column">
              SỐ TIỀN
            </th>
            <th rowspan="2" class="small-column">
            TỒN QUỸ
          </th>
          </tr>
      
          <tr>
            <th>PT</th>
            <th>PC</th>
            <th>THU</th>
            <th>CHI</th>
           
        </tr>
  
  `;
  public headHtml: SafeHtml;
  public rowHtml: SafeHtml;


   

  constructor(private _dataService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService) {
      this.headHtml = this.sanitizer.bypassSecurityTrustHtml(this.stringheadtable);

     
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);
    this.loadData();

  
    //get param from component

    this.route.queryParams.subscribe(params => {
      this.fromDate =params['fromDate']
      this.toDate = params['toDate']
      this.nametable = params['nametable']
      this.ma_tk = params['ma_tk']
      
      
      // .split('-').reverse().join('/')
     
    });

    
   

  }
  async loadData() {
  
    try {
    
      const response : any = await this._dataService.postCanDoiKeToan('/TongHopPS',{
        TU_NGAY: this.getNowUTC(this.toDate),
        DEN_NGAY:this.getNowUTC(this.fromDate),
        MA_TK: "131",  
        ID_DV: 1,
        ID_DT: 0,  //1117

      }).toPromise();
      this.chungtus = response;
      console.log(this.chungtus[1])
      this.chungtus.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
 
  }

  


  
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.NGAY_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
} 
  getSum(chungtus, field){
    return  chungtus
    .reduce((sum,chungtu)=> sum + chungtu[field],0  )   
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
      "Name": "NGAY_CT",
      "Width": 20,
      "Format": ""
    },
    {
      "Name": "SO_CT",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "SO_CT",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "DIEN_GIAI",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "GIA_VON",
     
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "SO_LUONG_NHAP",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TIEN_NHAP",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "SO_LUONG_XUAT",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TIEN_XUAT",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "SO_LUONG_TON",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TIEN_TON",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    }
      
    
  ]

  private getNowUTC(now : Date ) {
   
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

 
  

}