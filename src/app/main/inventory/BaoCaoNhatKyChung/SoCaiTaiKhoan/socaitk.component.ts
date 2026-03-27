import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { TaiKhoanDialogComponent } from "src/app/main/inventory/Dialog/TaiKhoan/taikhoan-dialog.component";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DoiTuongDialogComponent } from "../../Dialog/DoiTuong/doituong-dialog.component";
import { SanPhamDialogComponent } from "../../Dialog/SanPham/sanpham-dialog.component";
import { VuViecDialogComponent } from "../../Dialog/VuViec/vuviec-dialog.component";
import { NhomDoiTuongDialogComponent } from "../../Dialog/NhomDoiTuong/nhomdoituong-dialog.component";
import { YeuToPhiDialogComponent } from "../../Dialog/YeuToPhi/yeutophi-dialog.component";
import { KhoanMucDialogComponent } from "../../Dialog/KhoanMuc/khoanmuc-dialog.component";
@Component({
  selector: "app-socaitk",
  templateUrl: "./socaitk.component.html",
  styleUrls: ["./socaitk.component.css"],
})
export class SoCaiTKComponent implements OnInit {
  @ViewChild("modalAddEdit", { static: false })
  public modalAddEdit: ModalDirective;
  @ViewChild("dateRangeSection") dateRangeSection: ElementRef;

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
  public filter: string = "";
  public chungtus: any[];
  public nametable = "Sổ Cái Tài Khoản";
  public don_vi: string = "0103542639";

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

  bsModalRef: BsModalRef;

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.updateColumnInfo();
    this.getListTaiKhoan();
    this.loadData();
  }

  bsConfig: Partial<BsDatepickerConfig> = {
    rangeInputFormat: "DD/MM/YYYY",
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfo);
  }
  private getNowUTC(now: Date) {
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  }

  async loadData() {
    try {
      const response: any = await this.dataService
        .post("/SoCaiTaiKhoan", {
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
          ID_NHOM_SP: 0,
        })
        .toPromise();
      this.chungtus = response;
      console.log(this.chungtus.length);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        fromDate: this.fromDate.toISOString().slice(0, 10),
        toDate: this.toDate.toISOString().slice(0, 10),
        nametable: this.nametable,
        ma_tk: this.ma_tk,
      },
      state: {
        chungtus: this.chungtus,
      },
    };
    this.router.navigate(["/main/inventory/printCDKT"], navigationExtras);
  }
  async getListTaiKhoan() {
    await this.dataService.get("/TaiKhoan").subscribe((response: any) => {
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

  openTKDialog() {
    const dialogRef = this.modalService.show(TaiKhoanDialogComponent);
    dialogRef.content.taikhoanSelected.subscribe((idKho: string) => {
      this.ma_tk = idKho;
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
  openDUSPDialog() {
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
  openYTPDialog() {
    const dialogRef = this.modalService.show(YeuToPhiDialogComponent);
    dialogRef.content.yeuToPhiSelected.subscribe((selectedYTP: any) => {
      this.ID_YTP = selectedYTP.ID_YTP;
      this.ma_ytp = selectedYTP.MA_YTP;
      this.ten_ytp = selectedYTP.TEN_YTP;
      dialogRef.hide();
    });
  }
  openNDTDialog() {
    const dialogRef = this.modalService.show(NhomDoiTuongDialogComponent);
    dialogRef.content.nhomDoiTuongSelected.subscribe((selectedNDT: any) => {
      this.ID_NHOM_DT = selectedNDT.ID_NHOM_DT;
      this.ma_nhom_dt = selectedNDT.MA_NHOM_DT;
      this.ten_nhom_dt = selectedNDT.TEN_NHOM_DT;
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
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  public columnInfo: any[] = [
    {
      Name: "TEN_TK_DU",
      Caption: "Tài khoản đối ứng",
      Width: 80,
      Format: "",
    },
    {
      Name: "PS_NO",
      Caption: "Phát sinh nợ",
      Width: 90,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "PS_CO",
      Caption: "Phát sinh có",
      Width: 100,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "PS_NO_NT",
      Caption: "Phát sinh nợ(NT)",
      Width: 90,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "PS_CO_NT",
      Caption: "Phát sinh có(NT)",
      Width: 100,
      Format: "#,##0.##;(#,##0.##);#",
    },
  ];
}
