import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { KhoDialogComponent } from "src/app/main/inventory/Dialog/Kho/kho-dialog.component";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { NhomNguonLucDialogComponent } from "../../Dialog/NhomNguonLuc/nhomnguonluc-dialog.component";
import { NguonLucDialogComponent } from "../../Dialog/NguonLuc/nguonluc-dialog.component";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-thekho",
  templateUrl: "./thekho.component.html",
  styleUrls: ["./thekho.component.css"],
})
export class TheKhoComponent implements OnInit {
  @ViewChild("modalAddEdit", { static: false })
  public modalAddEdit: ModalDirective;
  @ViewChild("dateRangeSection") dateRangeSection: ElementRef;

  public isDateRangeVisible: boolean = false;
  public keyword: string = "";
  public dateRange: Date[];
  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();

  public totalRow: number;
  public filter: string = "";
  public chungtus: any[] = [];
  public nametable = "Thẻ Kho";
  public don_vi: string = "0103542639";

  public ID_KHO: number = 0;
  public ID_NHOM_NL: string = "";
  public ID_NL: string = "";

  public ma_nhom_nl: string = "";
  public ma_nl: string = "";
  public ma_kho: string = "";

  public ten_kho: string = "";
  public ten_nhom_nl: string = "";
  public ten_nl: string = "";

  bsModalRef: BsModalRef;

  constructor(
    private titleService: Title,
    private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Thẻ Kho");
    this.fromDate.setDate(1);
    this.toDate.setDate(new Date().getDate());
    this.updateColumnInfo();
  }

  bsConfig: Partial<BsDatepickerConfig> = {
    rangeInputFormat: "DD/MM/YYYY",
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfonhapkho);
  }
  private getNowUTC(now: Date) {
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  }

  async loadData() {
    try {
      const response: any = await this.dataService
        .postCanDoiKeToan("/TheKho", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_KHO: this.ID_KHO,
        })
        .toPromise();
      this.chungtus = response || [];
    } catch (error) {
      console.error("An error occurred:", error);
    }
    this.currentPage = 1;
    this.updatePagedData();
  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        fromDate: this.fromDate.toISOString().slice(0, 10),
        toDate: this.toDate.toISOString().slice(0, 10),
        nametable: this.nametable,
        ma_kho: this.ma_kho,
        ten_kho: this.ten_kho,
      },
      state: {
        chungtus: this.chungtus,
      },
    };
    this.router.navigate(["/main/inventory/printTheKho"], navigationExtras);
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }
  openDialog() {
    const dialogRef = this.modalService.show(KhoDialogComponent);
    dialogRef.content.khoSelected.subscribe((kho: any) => {
      this.ID_KHO = kho.ID_KHO;
      this.ma_kho = kho.MA_KHO;
      this.ten_kho = kho.TEN_KHO;
      // Close the dialog if needed
      dialogRef.hide();
    });
  }
  openNLDialog() {
    const dialogRef = this.modalService.show(NguonLucDialogComponent);
    dialogRef.content.nguonLucSelected.subscribe((selectedNDT: any) => {
      this.ID_NL = selectedNDT.ID_NL;
      this.ma_nl = selectedNDT.MA_NL;
      this.ten_nl = selectedNDT.TEN_NL;
      dialogRef.hide();
    });
  }

  openNNLDialog() {
    const dialogRef = this.modalService.show(NhomNguonLucDialogComponent);
    dialogRef.content.nhomNguonLucSelected.subscribe((selectedNDT: any) => {
      this.ID_NHOM_NL = selectedNDT.ID_NHOM_NL;
      this.ma_nhom_nl = selectedNDT.MA_NHOM_NL;
      this.ten_nhom_nl = selectedNDT.TEN_NHOM_NL;
      dialogRef.hide();
    });
  }
  printTemplate = "Tổng hợp";
  printOption = "Xem dạng bảng";

  showTemplateDropdown = false;
  showOptionDropdown = false;

  toggleTemplateDropdown() {
    this.showTemplateDropdown = !this.showTemplateDropdown;
  }

  toggleOptionDropdown() {
    this.showOptionDropdown = !this.showOptionDropdown;
  }

  selectTemplate(value: string) {
    this.printTemplate = value;
    this.showTemplateDropdown = false;
  }

  selectOption(value: string) {
    this.printOption = value;
    this.showOptionDropdown = false;
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

  //Pagniation
  pagedData: any[] = [];

  pageSize = 5;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil((this.chungtus?.length || 0) / this.pageSize);
  }

  updatePagedData() {
    if (!Array.isArray(this.chungtus)) {
      this.pagedData = [];
      return;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedData = this.chungtus.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePagedData();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // số trang xung quanh

    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    let l: any;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push(-1); // -1 = dấu ...
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  trackByPage(index: number, item: number) {
    return item;
  }

  public columnInfonhapkho: any[] = [
    {
      Name: "SO_CT",
      Caption: "Số CT",
      Width: 10,
      Format: "",
    },
    {
      Name: "NGAY_CT",
      Caption: "Ngày CT",
      Width: 10,
      Format: "d",
    },
    {
      Name: "MA_NL",
      Caption: "Ma HH'VT ",
      Width: 10,
      Format: "",
    },
    {
      Name: "DIEN_GIAI",
      Caption: "Diễn giải",
      Format: "",
    },
    {
      Name: "SO_LUONG_NHAP",
      Caption: "Số lượng nhập",
      Width: 15,
      Format: "",
    },
    {
      Name: "SO_LUONG_XUAT",
      Caption: "Số lượng xuất",
      Width: 15,
      Format: "",
    },
    {
      Name: "SO_LUONG_TON",
      Caption: "Số lượng tồn",
      Width: 15,
      Format: "",
    },
  ];
}
