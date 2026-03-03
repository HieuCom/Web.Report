import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NavigationExtras, Router } from '@angular/router';
import { ColuminfoService } from 'src/app/core/services/columinfo.service';
import { KhoDialogComponent } from 'src/app/main/inventory/Dialog/kho-dialog.component';
@Component({
  selector: 'app-thekho',
  templateUrl: './thekho.component.html',
  styleUrls: ['./thekho.component.css']
})
export class TheKhoComponent implements OnInit {

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
  public nhapkhos: any[];
  public nametable = 'THẺ KHO';

  public ID_KHO: number = 0;


  // lấy từ api /Kho theo ID_KHO
  public ma_kho: string = '';
  public ten_kho: string = '';



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
  private getNowUTC(now: Date) {

    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
  }

  async loadData() {

    try {

      const response: any = await this.dataService.postCanDoiKeToan('/TheKho',
        {
          TU_NGAY: this.getNowUTC(this.fromDate), DEN_NGAY: this.getNowUTC(this.toDate), ID_KHO: this.ID_KHO
        }).toPromise();
      this.nhapkhos = response;
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
        'ma_kho': this.ma_kho,
        'ten_kho': this.ten_kho,
      },
      state: {
        chungtus: this.nhapkhos
      }
    };
    this.router.navigate(['/main/inventory/printTheKho'], navigationExtras);


  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter(chungtu => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }
  openDialog() {
    const dialogRef = this.modalService.show(KhoDialogComponent);
    dialogRef.content.khoSelected.subscribe((kho: any) => {
      this.ID_KHO = kho.ID_KHO;
      this.ma_kho = kho.MA_KHO
      // Close the dialog if needed
      dialogRef.hide();
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


  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }




  public columnInfonhapkho: any[] = [
    {
      "Name": "SO_CT",
      "Caption": "Số CT",
      "Width": 10,
      "Format": ""
    },
    {
      "Name": "NGAY_CT",
      "Caption": "Ngày CT",
      "Width": 10,
      "Format": "d"
    },
    {
      "Name": "MA_NL",
      "Caption": "Ma HH'VT ",
      "Width": 10,
      "Format": ""
    },       
    {
      "Name": "DIEN_GIAI",
      "Caption": "Diễn giải",
      "Format": ""
    },
    {
      "Name": "SO_LUONG_NHAP",
      "Caption": "Số lượng nhập",
      "Width": 15,
      "Format": ""
    },
    {
      "Name": "SO_LUONG_XUAT",
      "Caption": "Số lượng xuất",
      "Width": 15,
      "Format": ""
    },
    {
      "Name": "SO_LUONG_TON",
      "Caption": "Số lượng tồn",
      "Width": 15,
      "Format": ""
    },


  ]

}
