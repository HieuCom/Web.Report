import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { TaiKhoanDialogComponent } from 'src/app/main/inventory/Dialog/taikhoan-dialog.component';
@Component({
  selector: 'app-soquytienguinh',
  templateUrl: './soquytienguinh.component.html',
  styleUrls: ['./soquytienguinh.component.css']
})
export class SoQuyTienGuiNHComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef;

  public isDateRangeVisible: boolean = false;
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
  public chungtus: any[];
  public nametable = 'Sổ Quỹ Tiền Gửi Ngân Hàng';
  public ma_tk: string = '112';

  public psco: number = 0;
  public psno: number = 0;


  public nodauky: number = 0;
  public codauky: number = 0;

  public dauky: number = 0;

  public nocuoiky: number = 0;
  public cocuoiky: number = 0;
  bsModalRef: BsModalRef;

  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.loadData();
  }

  private getNowUTC(now: Date) {

    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  async loadData() {
    this.dauky = 0;
    await this.loadnodauky();
    await this.loadnocuoiky();
    try {

      const response: any = await this.dataService.post('/SoQuyTienGuiNH',
        {
          TU_NGAY: this.getNowUTC(this.fromDate), DEN_NGAY: this.getNowUTC(this.toDate), MA_TK: this.ma_tk

        }).toPromise();
      this.chungtus = response;
      this.psco = this.chungtus.reduce((sum, chungtu) => sum + chungtu.PS_CO, 0);
      this.psno = this.chungtus.reduce((sum, chungtu) => sum + chungtu.PS_NO, 0);
      this.TotalDuCuoi()
    } catch (error) {
      console.error('An error occurred:', error);
    }


  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate': this.fromDate.toISOString().slice(0, 10),
        'toDate': this.toDate.toISOString().slice(0, 10),
        'nametable': this.nametable
      },
      state: {
        chungtus: this.chungtus.sort((a, b) => (a.SO_CT > b.SO_CT) ? 1 : ((b.SO_CT > a.SO_CT) ? -1 : 0))
      }
    };
    this.router.navigate(['/main/inventory/printSQTGNH'], navigationExtras);
  }

  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }

  TotalDuCuoi() {
    let dk = this.dauky;
    this.chungtus.forEach(chungtu => {
      chungtu.DU_CUOI = dk + chungtu.PS_NO - chungtu.PS_CO;
      dk = chungtu.DU_CUOI;
    });
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

  async loadnodauky() {

    try {

      const response: any = await this.dataService.post('/DauKyTaiKhoan',
        {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: 0,
          ID_DT: 0,
          MA_TK: this.ma_tk

        }).toPromise();
      this.nodauky = response.DKN ?? 0;
      this.codauky = response.DKC ?? 0;
      this.dauky = response.DKN - response.DKC;
    } catch (error) {
      console.error('An error occurred:', error);
    }

  }

  async loadnocuoiky() {

    try {

      const response: any = await this.dataService.post('/CuoiKyTaiKhoan',
        {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: 1,
          ID_DT: 0,
          MA_TK: this.ma_tk

        }).toPromise();
      this.nocuoiky = response.CKN;
      this.cocuoiky = response.CKC;
    } catch (error) {
      console.error('An error occurred:', error);
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

  openDialog() {
    const dialogRef = this.modalService.show(TaiKhoanDialogComponent);
    dialogRef.content.taikhoanSelected.subscribe((ma_tk: string) => {
      this.ma_tk = ma_tk;
      // Close the dialog if needed
      dialogRef.hide();
    });
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
      "Name": "DIEN_GIAI",
      "Caption": "Diễn giải",
      "Width": 70,
      "Format": ""
    },

    {
      "Name": "ONG_BA",
      "Caption": "Ông bà",
      "Width": 50,
      "Format": ""
    },

    {
      "Name": "TK_DOI_UNG",
      "Caption": "TK đối ứng",
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "PS_NO",
      "Caption": "Thu tiền",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "PS_CO",
      "Caption": "Chi tiền",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "DU_CUOI",
      "Caption": "Dư cuối",
      "Width": 50,
      "Format": "#,##0.##;(#,##0.##);#"
    },


  ]

}
