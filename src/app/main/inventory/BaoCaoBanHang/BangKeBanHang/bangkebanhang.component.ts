import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DoiTuongDialogComponent } from "../../Dialog/DoiTuong/doituong-dialog.component";
import { KhoanMucDialogComponent } from "../../Dialog/KhoanMuc/khoanmuc-dialog.component";
import { SanPhamDialogComponent } from "../../Dialog/SanPham/sanpham-dialog.component";
import { VuViecDialogComponent } from "../../Dialog/VuViec/vuviec-dialog.component";
import { KhoDialogComponent } from "../../Dialog/Kho/kho-dialog.component";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-bangkebanhang",
  templateUrl: "./bangkebanhang.component.html",
  styleUrls: ["./bangkebanhang.component.css"],
})
export class BangKeBanHangComponent implements OnInit {
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
  public nametable = "Bảng Kê Bán Hàng";
  public don_vi: string = "0103542639";

  public ID_KHO: number = 0;

  public ma_tk: string = "";
  public ma_kho: string = "";
  public ma_dt: string = "";
  public ma_nl: string = "";
  public ma_sp: string = "";
  public ma_nhom_nl: string = "";
  public ma_nhom_sp: string = "";
  public ma_km: string = "";
  public ma_vv: string = "";
  public ma_ytp: string = "";
  public ma_nhom_dt: string = "";
  public ma_tt: string = "";

  public ID_DT: string = "";
  public ID_NL: string = "";
  public ID_SP: string = "";
  public ID_KM: string = "";
  public ID_VV: string = "";
  public ID_YTP: string = "";
  public ID_NHOM_DT: string = "";
  public ID_NHOM_NL: string = "";
  public ID_NHOM_SP: string = "";
  public ID_TT: string = "";

  public ten_dt: string = "";
  public ten_nl: string = "";
  public ten_sp: string = "";
  public ten_km: string = "";
  public ten_vv: string = "";
  public ten_ytp: string = "";
  public ten_nhom_dt: string = "";
  public ten_nhom_nl: string = "";
  public ten_nhom_sp: string = "";
  public ten_tt: string = "";
  public ten_kho: string = "";

  bsModalRef: BsModalRef;

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Bảng kê bán hàng");
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
        .postCanDoiKeToan("/BangKeBanHang", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: "1",
          MA_KHO: this.ma_kho,
          MA_NL: this.ma_nl,
          TEN_NL: this.ten_nl,
          ID_VV: this.ID_VV,
          UserID: "1",
          BIT_LOAI_NL: 33,
          ID_LOAI_CT: "5",
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
        fromDate: this.getNowUTC(this.fromDate).toISOString().slice(0, 10),
        toDate: this.getNowUTC(this.toDate).toISOString().slice(0, 10),
        nametable: this.nametable,
      },
      state: {
        chungtus: this.chungtus,
      },
    };
    this.router.navigate(["/main/inventory/printBCLL"], navigationExtras);
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.SO_CT === groupName)
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

  reloaddata() {
    this.loadData();
  }

  openKhoDialog() {
    const dialogRef = this.modalService.show(KhoDialogComponent);
    dialogRef.content.khoSelected.subscribe((kho: any) => {
      this.ID_KHO = kho.ID_KHO;
      this.ma_kho = kho.MA_KHO;
      this.ten_kho = kho.TEN_KHO;
      // Close the dialog if needed
      dialogRef.hide();
    });
  }

  openDTDialog() {
    const dialogRef = this.modalService.show(DoiTuongDialogComponent);
    dialogRef.content.doiTuongSelected.subscribe((selectedDT: any) => {
      this.ID_DT = selectedDT.ID_DT;
      this.ma_dt = selectedDT.MA_DT;
      this.ten_dt = selectedDT.TEN_DT;
      dialogRef.hide();
    });
  }
  openSPDialog() {
    const dialogRef = this.modalService.show(SanPhamDialogComponent, {
      initialState: {
        bitLoaiNL: 16,
      },
      class: "modal-xl",
    });
    dialogRef.content.sanPhamSelected.subscribe((selectedSP: any) => {
      this.ID_SP = selectedSP.ID_NL;
      this.ma_sp = selectedSP.MA_NL;
      this.ten_sp = selectedSP.TEN_NL;
      dialogRef.hide();
    });
  }
  openKMDialog() {
    const dialogRef = this.modalService.show(KhoanMucDialogComponent);
    dialogRef.content.khoanMucSelected.subscribe((selectedKM: any) => {
      this.ID_KM = selectedKM.ID_KM;
      this.ma_km = selectedKM.MA_KM;
      this.ten_km = selectedKM.TEN_KM;
      dialogRef.hide();
    });
  }
  openVVDialog() {
    const dialogRef = this.modalService.show(VuViecDialogComponent);
    dialogRef.content.vuViecSelected.subscribe((selectedVV: any) => {
      this.ID_VV = selectedVV.ID_VV;
      this.ma_vv = selectedVV.MA_VV;
      this.ten_vv = selectedVV.TEN_VV;
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
      Name: "MA_NL",
      Caption: "Mã NL",
      Width: 50,
      Format: "",
    },
    {
      Name: "SO_CT",
      Caption: "Số CT",
      Width: 50,
      Format: "",
    },
    {
      Name: "DIEN_GIAI",
      Caption: "Diên Giải",
      Width: 50,
      Format: "",
    },
    {
      Name: "TEN_DVT",
      Caption: "ĐVT",
      Width: 50,
      Format: "",
    },
    {
      Name: "TK_DU",
      Caption: "TK ĐƯ",
      Width: 50,
      Format: "",
    },
    {
      Name: "SO_LUONG",
      Caption: "SL",
      Width: 70,
      Format: "",
    },
    {
      Name: "GIA_VON",
      Caption: "Giá Vốn",
      Width: 50,
      Format: "",
    },

    {
      Name: "TIEN_VON",
      Caption: "Tiền Vốn",
      Width: 90,
      Format: "#,##0.##;(#,##0.##);#",
    },

    {
      Name: "GIA2",
      Caption: "Giá Bán",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TIEN2",
      Caption: "Tiền Bán",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TIEN_BAN",
      Caption: "Thuế GTGT",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TIEN_BAN",
      Caption: "Tiền Thanh Toán",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name1: "TIEN2",
      Name2: "TIEN_VON",
      Caption: "Lãi Lỗ",
      Width: 50,
      Format: "calc",
    },
  ];
}
