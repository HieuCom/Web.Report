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
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-printSCTK',
  templateUrl: './preview-sochitietkho.component.html',
  styleUrls: ['./sochitietkho.component.css']
})
export class PreviewSCTKComponent implements OnInit {
  public fromDate: string ='';
  public toDate: string = '';
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public ma_tk: string = '1331';
  
  public nametable :string ;
  public ma_nl :string; 
  public ma_kho :string;

  public namekho :string; 
  public namehang :string;


  
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
  data: any;


   

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private sharedDataService: SharedDataService,
    private _authenService: AuthenService) {
      this.headHtml = this.sanitizer.bypassSecurityTrustHtml(this.stringheadtable);

     
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);

    this.sharedDataService.currentData.subscribe(data => {
      if (data) {
        this.data = data;
      }
    });


      this.fromDate =this.data.fromDate;
      this.toDate = this.data.toDate;
      this.nametable = this.data.nametable;
      
      this.ma_nl = this.data.ma_nl;
      this.ma_kho = this.data.ma_kho;
      
      
    
  

    this.chungtus = history.state.chungtus;
    this.chungtus.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0));
    this.loadKho();
    this.loadNguonLuc();

  }

  async loadKho() {
  
    const uri = `/Kho/${this.ma_kho}`;
    this.dataService.getKho(uri).subscribe(response => {
      this.namekho = response['MA_KHO'] +"-"+response['TEN_KHO'];
    
    }, error => {
      console.error('There was an error retrieving the warehouse name', error);
    });
    
  }
 

  async loadNguonLuc() {
  
    const uri = `/NguonLuc/${this.ma_nl}`;
    this.dataService.getKho(uri).subscribe(response => {
      this.namehang = response['MA_NL'] +"-"+response['TEN_NL'];
    
    }, error => {
      console.error('There was an error retrieving the warehouse name', error);
    });
    
  }

  
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
}

  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspDoiTuong___FindUserName", "CommandType": 1025, "Parameters": data }
      await this.dataService.post('/commands', params).subscribe((response: any) => {
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

 
  

}