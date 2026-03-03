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
  selector: 'app-socaitk',
  templateUrl: './socaitk.component.html',
  styleUrls: ['./socaitk.component.css']
})
export class SoCaiTKComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef;

  public isDateRangeVisible: boolean = false;
  public isAccVisible: boolean = true;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public ma_tk: string;
  public Taikhoans: any;
  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();

  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public chungtus: any[];
  public nametable = 'Sổ Cái Tài khoản';

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
    this.getListTaiKhoan();
    this.loadData();
  }

  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfo);
  }
  private getNowUTC(now: Date) {

    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  async loadData() {

    try {

      const response: any = await this.dataService.post('/SoCaiTaiKhoan',
        {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          MA_TK: this.ma_tk,
          MA_TKDUs: "",
          ID_DV: 1,
          ID_DT: 0,
          ID_SP: 0,
          ID_KM: 0,
          ID_VV: 0,
          ID_YTP: 0,
          ID_TT: 0,
          ID_NHOM_DT: 0,
          ID_NHOM_SP: 0
        }).toPromise();
      this.chungtus = response;
      console.log(this.chungtus.length);
    } catch (error) {
      console.error('An error occurred:', error);
    }


  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'fromDate': this.fromDate.toISOString().slice(0, 10),
        'toDate': this.toDate.toISOString().slice(0, 10),
        'nametable': this.nametable,
        'ma_tk': this.ma_tk,
      },
      state: {
        chungtus: this.chungtus
      }
    };
    this.router.navigate(['/main/inventory/printCDKT'], navigationExtras);

  }
  async getListTaiKhoan() {
    await this.dataService.get('/TaiKhoan').subscribe((response: any) => {
      if (response) {
        this.Taikhoans = response;
      }
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

  reloaddata() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.modalService.show(TaiKhoanDialogComponent);
    dialogRef.content.taikhoanSelected.subscribe((idKho: string) => {
      this.ma_tk = idKho;
      // Close the dialog if needed
      dialogRef.hide();
    });
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
      "Name": "TEN_TK_DU",
      "Caption": "Tài khoản đối ứng",
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
    },
    {
      "Name": "PS_NO_NT",
      "Caption": "Phát sinh nợ(NT)",
      "Width": 90,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "PS_CO_NT",
      "Caption": "Phát sinh có(NT)",
      "Width": 100,
      "Format": "#,##0.##;(#,##0.##);#"
    }

  ]

}
