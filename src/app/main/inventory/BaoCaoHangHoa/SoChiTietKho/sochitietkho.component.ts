import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { SharedDataService } from "src/app/core/services/shared-data.service";
import { KhoDialogComponent } from "src/app/main/inventory/Dialog/Kho/kho-dialog.component";
import { NguonLucDialogComponent } from "src/app/main/inventory/Dialog/NguonLuc/nguonluc-dialog.component";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-sochitietkho",
  templateUrl: "./sochitietkho.component.html",
  styleUrls: ["./sochitietkho.component.css"],
})
export class SoChiTietKhoComponent implements OnInit {
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

  public pageNumber: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = "";
  public chungtus: any[] = [];
  public danhSachKho: any[] = [];
  public nametable = "Sổ Chi Tiết Hàng Hóa";
  public don_vi: string = "0103542639";

  public ID_KHO: number = 0;
  public ID_NL: number = 0;

  public ma_tk: number = 1331;
  public ma_kho: string = "";
  public ma_nl: string = "";

  public ten_kho: string = "";
  public ten_nl: string = "";

  bsModalRef: BsModalRef;

  constructor(
    private dataService: DataService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private sharedDataService: SharedDataService,

    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.updateColumnInfo();
    this.loadData();
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
        .postCanDoiKeToan("/SoChiTietKho", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: "1",
          ID_KHO: this.ID_KHO,
          ID_NHOM_NL: "0",
          ID_NL: this.ID_NL,
          BIT_LOAI_NL: 0,
          ID_HDONG: 0,
          ID_LO: 0,
        })
        .toPromise();
      this.chungtus = response || [];
      this.chungtus.sort((a, b) =>
        a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }

    this.currentPage = 1;
    this.updatePagedData();
  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      state: {
        chungtus: this.chungtus.sort((a, b) =>
          a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
        ),
      },
    };

    const data = {
      fromDate: this.fromDate.toISOString().slice(0, 10),
      toDate: this.toDate.toISOString().slice(0, 10),
      nametable: this.nametable,
      chungtus: this.chungtus,
      ID_KHO: this.ID_KHO,
      ID_NL: this.ID_NL,
    };

    this.sharedDataService.updateData(data);
    this.router.navigate(["/main/inventory/printSCTK"], navigationExtras);
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }

  openKhoDialog() {
    const dialogRef = this.modalService.show(KhoDialogComponent);
    dialogRef.content.khoSelected.subscribe((selectedKho: any) => {
      this.ID_KHO = selectedKho.ID_KHO;
      this.ma_kho = selectedKho.MA_KHO;
      this.ten_kho = selectedKho.TEN_KHO;

      // Close the dialog if needed
      dialogRef.hide();
    });
  }

  openNLDialog() {
    const dialogRef = this.modalService.show(NguonLucDialogComponent);
    dialogRef.content.nguonLucSelected.subscribe((selectedNL: any) => {
      this.ID_NL = selectedNL.ID_NL;
      this.ma_nl = selectedNL.MA_NL;
      this.ten_nl = selectedNL.TEN_NL;
      //console.log(selectedKho);
      // Close the dialog if needed
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

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
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
      Name: "NGAY_CT",
      Caption: "Ngày CT",
      Width: 50,
      Format: "d",
    },

    {
      Name: "SO_CT",
      Caption: "Số chứng từ",
      Width: 50,
      Format: "",
    },
    {
      Name: "DIEN_GIAI",
      Caption: "Diễn giải",
      Width: 50,
      Format: "",
    },

    {
      Name: "SO_LUONG",
      Caption: "Số lượng",
      Width: 30,
      Format: "",
    },
    {
      Name: "GIA_VON",
      Caption: "Giá",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TIEN_VON",
      Caption: "Tiền",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },

    {
      Name: "SO_LUONG_NHAP",
      Caption: "Số lượng nhập",
      Width: 30,
      Format: "",
    },

    {
      Name: "TIEN_NHAP",
      Caption: "Tiền nhập",
      Width: 30,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "SO_LUONG_XUAT",
      Caption: "Số lượng xuất",
      Width: 50,
      Format: "",
    },
    {
      Name: "TIEN_XUAT",
      Caption: "Tiền xuất",
      Width: 30,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TEN_KH_HD",
      Caption: "Số lượng tồn",
      Width: 30,
      Format: "",
    },
    {
      Name: "TEN_KH_HD",
      Caption: "Tiền tồn",
      Width: 30,
      Format: "#,##0.##;(#,##0.##);#",
    },
  ];
}
