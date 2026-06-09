import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { TaiKhoanDialogComponent } from '../Dialog/taikhoan-dialog.component';

@Component({
  selector: 'app-hoatdong-list',
  templateUrl: './hoatdong-list.component.html',
  styleUrls: ['./hoatdong-list.component.css']
})
export class HoaDongListComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('dateRangeSection') dateRangeSection: ElementRef;

  public isDateRangeVisible: boolean = true;
  public isAccVisible: boolean = false;

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
  public Taikhoans: any;
  public nametable = 'BÁO CÁO KẾT QUẢ HOẠT ĐỘNG SẢN XUẤT KINH DOANH';
  public ma_tk: string;

  bsModalRef: BsModalRef;

  constructor(private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService) { }

  ngOnInit() {

    this.fromDate.setDate(1)
    this.toDate.setDate
    console.log(this.fromDate.toISOString().slice(0, 10),);

    //update columnInfo for table in service
    this.updateColumnInfo();
    //load danh mục tài khoản
    this.loadTaiKhoan();
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
      const response: any = await this.dataService.postCanDoiKeToan('/KQHDSXKD',
        {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          TU_NGAY_TR: this.getNowUTC(this.fromDateTR),
          DEN_NGAY_TR: this.getNowUTC(this.toDateTR)
        }).toPromise();
      this.chungtus = response;
      console.log(this.chungtus[0].BOLD);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async loadTaiKhoan() {
    try {
      const response: any = await this.dataService.get('/TaiKhoan').toPromise();
      this.Taikhoans = response;
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





  public columnInfo: any[] = [
    {
      "Name": "TEN_CHI_TIEU",
      "Caption": "Tên Chỉ Tiêu",
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
      "Width": 50,
      "Format": ""
    },
    {
      "Name": "TIEN",
      "Caption": "Kỳ Này ",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_KYTRUOC",
      "Caption": "Kỳ Trước",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    },

    {
      "Name": "TIEN_KYTRUOC",
      "Caption": "Kỳ Này NT",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "TIEN_KYTRUOC_NT",
      "Caption": "Kỳ Trước NT",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    },


  ]


}
