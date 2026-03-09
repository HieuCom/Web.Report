import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { TaiKhoanDialogComponent } from "src/app/main/inventory/Dialog/TaiKhoan/taikhoan-dialog.component";
import { NguonLucDialogComponent } from "../../Dialog/NguonLuc/nguonluc-dialog.component";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { VuViecDialogComponent } from "../../Dialog/VuViec/vuviec-dialog.component";
import { DoiTuongDialogComponent } from "../../Dialog/DoiTuong/doituong-dialog.component";
import { NhomSanPhamDialogComponent } from "../../Dialog/NhomSanPham/nhomsanpham-dialog.component";
@Component({
  selector: "app-soquytienmat",
  templateUrl: "./soquytienmat.component.html",
  styleUrls: ["./soquytienmat.component.css"],
})
export class SoQuyTienMatComponent implements OnInit {
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
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = "";
  public chungtus: any[];
  public nametable = "Sổ Quỹ Tiền Mặt";
  public ma_tk: string = "111";
  public ma_dt: string = "";
  public ma_nl: string = "";
  public ma_nhom_nl: string = "";
  public ma_km: string = "";
  public ma_vv: string = "";
  public ma_ytp: string = "";
  public ma_nhom_dt: string = "";
  public ma_tt: string = "";

  public ID_DT: string = "";
  public ID_NL: string = "";
  public ID_KM: string = "";
  public ID_VV: string = "";
  public ID_YTP: string = "";
  public ID_NHOM_DT: string = "";
  public ID_NHOM_NL: string = "";
  public ID_TT: string = "";

  public ten_dt: string = "";
  public ten_nl: string = "";
  public ten_km: string = "";
  public ten_vv: string = "";
  public ten_ytp: string = "";
  public ten_nhom_dt: string = "";
  public ten_nhom_nl: string = "";
  public ten_tt: string = "";

  public psco: number = 0;
  public psno: number = 0;

  public dauky: number = 0;
  public nodauky: number = 0;
  public codauky: number = 0;
  public nocuoiky: number = 0;
  public cocuoiky: number = 0;
  public showDiv: boolean = true;

  bsModalRef: BsModalRef;

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private modalService: BsModalService,
  ) {}

  bsConfig: Partial<BsDatepickerConfig> = {
    rangeInputFormat: "DD/MM/YYYY",
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.updateColumnInfo();
    this.loadData();

    // this.calculateTotalPsco();
    if (this.chungtus) {
      this.psco = this.chungtus.reduce(
        (sum, nhapkho) => sum + nhapkho.PS_CO,
        0,
      );
      console.log(this.psco);
    }
  }

  updateColumnInfo() {
    this.columnInfoService.changeColumnInfo(this.columnInfonhapkho);
  }
  private getNowUTC(now: Date) {
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  }

  async loadData() {
    await this.loadnodauky();
    await this.loadnocuoiky();
    try {
      const response: any = await this.dataService
        .post("/SoQuyTienMat", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: 1,
          ID_DT: 0,
          MA_TK: this.ma_tk,
        })
        .toPromise();
      this.chungtus = response;
      console.log(this.chungtus.length);
      if (this.chungtus) {
        this.psco = this.chungtus.reduce(
          (sum, nhapkho) => sum + nhapkho.PS_CO,
          0,
        );
        this.psno = this.chungtus.reduce(
          (sum, nhapkho) => sum + nhapkho.PS_NO,
          0,
        );
        this.TotalDuCuoi();
        console.log(this.psco);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async loadnodauky() {
    try {
      const response: any = await this.dataService
        .post("/DauKyTaiKhoan", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: 1,
          ID_DT: 0,
          MA_TK: this.ma_tk,
        })
        .toPromise();
      this.nodauky = response.DKN ?? 0;
      this.codauky = response.DKC ?? 0;
      this.dauky = response.DKN - response.DKC;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async loadnocuoiky() {
    try {
      const response: any = await this.dataService
        .post("/CuoiKyTaiKhoan", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: 1,
          ID_DT: 0,
          MA_TK: this.ma_tk,
        })
        .toPromise();
      this.nocuoiky = response.CKN ?? 0;
      this.cocuoiky = response.CKC ?? 0;
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
        nodauky: this.nodauky,
        nocuoiky: this.nocuoiky,
        psco: this.psco,
        psno: this.psno,
      },
      state: {
        chungtus: this.chungtus,
      },
    };
    this.router.navigate(["/main/inventory/printSQTM"], navigationExtras);
  }
  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.SO_CT === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }

  public calculateTotalPsco() {
    this.psco = this.chungtus.reduce((sum, nhapkho) => sum + nhapkho.PS_CO, 0);
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

  TotalDuCuoi() {
    let dk = this.dauky;
    this.chungtus.forEach((chungtu) => {
      chungtu.DU_CUOI = dk + chungtu.PS_NO - chungtu.PS_CO;
      dk = chungtu.DU_CUOI;
    });
  }

  openTKDialog() {
    const dialogRef = this.modalService.show(TaiKhoanDialogComponent);
    dialogRef.content.taikhoanSelected.subscribe((ma_tk: string) => {
      this.ma_tk = ma_tk;
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
  openNLDialog() {
    const dialogRef = this.modalService.show(NguonLucDialogComponent);
    dialogRef.content.nguonLucSelected.subscribe((selectedNL: any) => {
      this.ID_NL = selectedNL.ID_NL;
      this.ma_nl = selectedNL.MA_NL;
      this.ten_nl = selectedNL.TEN_NL;
      dialogRef.hide();
    });
  }
  openNSPDialog() {
    const dialogRef = this.modalService.show(NhomSanPhamDialogComponent);
    dialogRef.content.nhomSanPhamSelected.subscribe((selectedNSP: any) => {
      this.ID_NHOM_NL = selectedNSP.ID_NHOM_NL;
      this.ma_nhom_nl = selectedNSP.MA_NHOM_NL;
      this.ten_nhom_nl = selectedNSP.TEN_NHOM_NL;
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

  onChangePageSize() {
    this.loadData();
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
      Width: 70,
      Format: "",
    },

    {
      Name: "ONG_BA",
      Caption: "Ông bà",
      Width: 50,
      Format: "",
    },

    {
      Name: "TK_DOI_UNG",
      Caption: "TK đối ứng",
      Width: 50,
      Format: "",
    },
    {
      Name: "PS_NO",
      Caption: "Thu tiền",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "PS_CO",
      Caption: "Chi tiền",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TON_QUY",
      Caption: "Tồn Quỹ",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
  ];
}
