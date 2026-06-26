import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { BsModalService } from "ngx-bootstrap/modal";
import { DataService } from "src/app/core/services/data.service";
import { DoiTuongDialogComponent } from "src/app/main/inventory/Dialog/DoiTuong/doituong-dialog.component";
import { KhoanMucDialogComponent } from "src/app/main/inventory/Dialog/KhoanMuc/khoanmuc-dialog.component";
import { NhomDoiTuongDialogComponent } from "src/app/main/inventory/Dialog/NhomDoiTuong/nhomdoituong-dialog.component";
import { NhomSanPhamDialogComponent } from "src/app/main/inventory/Dialog/NhomSanPham/nhomsanpham-dialog.component";
import { SanPhamDialogComponent } from "src/app/main/inventory/Dialog/SanPham/sanpham-dialog.component";
import { TaiKhoanDialogComponent } from "src/app/main/inventory/Dialog/TaiKhoan/taikhoan-dialog.component";
import { TienTeDialogComponent } from "src/app/main/inventory/Dialog/TienTe/tiente-dialog.component";
import { VuViecDialogComponent } from "src/app/main/inventory/Dialog/VuViec/vuviec-dialog.component";
import { YeuToPhiDialogComponent } from "src/app/main/inventory/Dialog/YeuToPhi/yeutophi-dialog.component";

@Component({
  selector: "app-ReportFilterComponent",
  templateUrl: "./ReportFilterComponent.component.html",
  styleUrls: ["./ReportFilterComponent.component.css"],
})
export class ReportFilterComponent {
  selectedReport: string = "";

  public ma_tk: string = "112";
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

  showAdvanced = false;

  bsConfig: Partial<BsDatepickerConfig> = {
    rangeInputFormat: "DD/MM/YYYY",
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  constructor(
    private modalService: BsModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setDefaultReportFromUrl();
  }
  setDefaultReportFromUrl(): void {
    const segments = this.router.url.split("/");
    const reportCode = segments[segments.length - 1];

    this.selectedReport = reportCode;

    // render form tương ứng
    this.onReportChange();
  }
  private getNowUTC(now: Date) {
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  }

  openTKDialog() {
    const dialogRef = this.modalService.show(TaiKhoanDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.taikhoanSelected.subscribe((ma_tk: string) => {
        this.filter.ma_tk = ma_tk;
        // Close the dialog if needed
        dialogRef.hide();
      });
    }
  }

  openDTDialog() {
    const dialogRef = this.modalService.show(DoiTuongDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.doiTuongSelected.subscribe((selectedDT: any) => {
        this.ID_DT = selectedDT.ID_DT;
        this.filter.ma_dt = selectedDT.MA_DT;
        this.filter.ten_dt = selectedDT.TEN_DT;
        dialogRef.hide();
      });
    }
  }

  openSPDialog() {
    const dialogRef = this.modalService.show(SanPhamDialogComponent, {
      initialState: {
        bitLoaiNL: 16,
      },
      class: "modal-xl",
    });
    if (dialogRef.content) {
      dialogRef.content.sanPhamSelected.subscribe((selectedSP: any) => {
        this.ID_SP = selectedSP.ID_NL;
        this.filter.ma_sp = selectedSP.MA_NL;
        this.filter.ten_sp = selectedSP.TEN_NL;
        dialogRef.hide();
      });
    }
  }

  openKMDialog() {
    const dialogRef = this.modalService.show(KhoanMucDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.khoanMucSelected.subscribe((selectedKM: any) => {
        this.ID_KM = selectedKM.ID_KM;
        this.filter.ma_km = selectedKM.MA_KM;
        this.filter.ten_km = selectedKM.TEN_KM;
        dialogRef.hide();
      });
    }
  }

  openNSPDialog() {
    const dialogRef = this.modalService.show(NhomSanPhamDialogComponent, {
      initialState: {
        bitLoaiNL: 16,
      },
    });

    if (dialogRef.content) {
      dialogRef.content.nhomSanPhamSelected.subscribe((selectedNSP: any) => {
        this.ID_NHOM_SP = selectedNSP.ID_NHOM_NL;
        this.filter.ma_nhom_sp = selectedNSP.MA_NHOM_NL;
        this.filter.ten_nhom_sp = selectedNSP.TEN_NHOM_NL;
        dialogRef.hide();
      });
    }
  }
  openVVDialog() {
    const dialogRef = this.modalService.show(VuViecDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.vuViecSelected.subscribe((selectedVV: any) => {
        this.ID_VV = selectedVV.ID_VV;
        this.filter.ma_vv = selectedVV.MA_VV;
        this.filter.ten_vv = selectedVV.TEN_VV;
        dialogRef.hide();
      });
    }
  }
  openYTPDialog() {
    const dialogRef = this.modalService.show(YeuToPhiDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.yeuToPhiSelected.subscribe((selectedYTP: any) => {
        this.ID_YTP = selectedYTP.ID_YTP;
        this.filter.ma_ytp = selectedYTP.MA_YTP;
        this.filter.ten_ytp = selectedYTP.TEN_YTP;
        dialogRef.hide();
      });
    }
  }
  openTTDialog() {
    const dialogRef = this.modalService.show(TienTeDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.tienTeSelected.subscribe((selectedTT: any) => {
        this.ID_TT = selectedTT.ID_TT;
        this.filter.ma_tt = selectedTT.MA_TT;
        this.filter.ten_tt = selectedTT.TEN_TT;
        dialogRef.hide();
      });
    }
  }
  openNDTDialog() {
    const dialogRef = this.modalService.show(NhomDoiTuongDialogComponent);
    if (dialogRef.content) {
      dialogRef.content.nhomDoiTuongSelected.subscribe((selectedNDT: any) => {
        this.ID_NHOM_DT = selectedNDT.ID_NHOM_DT;
        this.filter.ma_nhom_dt = selectedNDT.MA_NHOM_DT;
        this.filter.ten_nhom_dt = selectedNDT.TEN_NHOM_DT;
        dialogRef.hide();
      });
    }
  }

  filter: any = {
    fromDate: this.getNowUTC(new Date()),
    toDate: this.getNowUTC(new Date()),
    ma_tk: "111",
    ma_dt: "",
    ma_vv: "",
    ma_sp: "",
    ma_km: "",
    ma_nhom_dt: "",
    don_vi: "0103542639",
    ma_nhom_sp: "",
    nametable: "Sổ Quỹ Tiền Mặt",
    ma_tt: "",
  };

  reportConfigs = {
    soquytienmat: [
      "fromDate",
      "toDate",
      "ma_tk",
      "ma_dt",
      "ma_vv",
      "ma_km",
      "ma_nhom_dt",
      "don_vi",
      "ma_nhom_sp",
      "nametable",
      "ma_tt",
    ],

    soquynganhang: [
      "fromDate",
      "toDate",
      "ma_tk",
      "ma_dt",
      "ma_vv",
      "ma_km",
      "ma_nhom_dt",
      "don_vi",
      "ma_nhom_sp",
      "nametable",
      "ma_tt",
    ],

    sochitietcongno: [
      "fromDate",
      "toDate",
      "ma_dt",
      "ma_vv",
      "ma_km",
      "ma_nhom_dt",
      "don_vi",
      "ma_nhom_sp",
      "nametable",
      "ma_tt",
    ],
  };
  currentFields: string[] = [];

  onReportChange() {
    this.currentFields = this.reportConfigs[this.selectedReport] || [];
  }

  getFilterData() {
    return this.filter;
  }
}
