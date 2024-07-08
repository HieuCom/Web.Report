import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { TaiKhoanCNDialogComponent } from '../Dialog/taikhoanCN-dialog.component';
@Component({
  selector: 'app-sochitietcongno',
  templateUrl: './sochitietcongno.component.html',
  styleUrls: ['./sochitietcongno.component.css']
})
export class SoChiTietCongNoComponent implements OnInit {

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
  public nametable= 'SỔ CHI TIẾT CÔNG NỢ';

  public ID_KHO: number = 0;

  public ma_tk: string = '131' ;
 



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
    
      const response: any = await this.dataService.postCanDoiKeToan('/SoChiTietCongNo', 
      { TU_NGAY:this.getNowUTC(this.fromDate), 
        DEN_NGAY : this.getNowUTC(this.toDate),
        MA_TK:this.ma_tk


      }).toPromise();
      this.nhapkhos = response;
      this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
    
    } catch (error) {
      console.error('An error occurred:', error); 
    }
    
 
  }

  chuyen(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate':this.getNowUTC(this.toDate),
        'toDate':this.getNowUTC(this.fromDate),
        'nametable': this.nametable,
        'ma_tk': this.ma_tk,
  
        
      } ,
      state: {
        chungtus: this.nhapkhos.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
      }
    };
    this.router.navigate(['/main/inventory/printSCCN'], navigationExtras);
   
    
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

  openDialog() {
    const dialogRef = this.modalService.show(TaiKhoanCNDialogComponent);
    dialogRef.content.khoSelected.subscribe((idKho: string) => {
      this.ma_tk = idKho;
      // Close the dialog if needed
      dialogRef.hide();
    });
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
     
      "Caption": "Mã đối tượng",
      "Width": 50,
      "Format": ""
    },
    {
     
      "Caption": "Tên đối tượng",
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
      "Name": "MA_TK",
      "Caption": "Mã TK",
      "Width": 30,
      "Format": ""
    },
    {
      "Name": "MA_TK_DU",
      "Caption": "TK DƯ",
      "Width": 30,
      "Format": ""
    },
  
      {
        "Name": "PS_NO",
        "Caption": "PS nợ",
        "Width": 30,
        "Format": ""
      },
      {
        "Name": "PS_CO",
        "Caption": "PS có",
        "Width": 30,
        "Format": ""
      },
      {
        "Name": "PS_NO_NT",
        "Caption": "PS nợ(NT)",
        "Width": 30,
        "Format": ""
      },
      {
        "Name": "PS_CO_NT",
        "Caption": "PS có(NT)",
        "Width": 30,
        "Format": ""
      },
     
     
    
      
      
    
  ]
  
}
