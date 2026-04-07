import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { TaiKhoanDialogComponent } from "src/app/main/inventory/Dialog/TaiKhoan/taikhoan-dialog.component";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { VuViecDialogComponent } from "../../Dialog/VuViec/vuviec-dialog.component";
import { DoiTuongDialogComponent } from "../../Dialog/DoiTuong/doituong-dialog.component";
import { NhomSanPhamDialogComponent } from "../../Dialog/NhomSanPham/nhomsanpham-dialog.component";
import { SanPhamDialogComponent } from "../../Dialog/SanPham/sanpham-dialog.component";
import { KhoanMucDialogComponent } from "../../Dialog/KhoanMuc/khoanmuc-dialog.component";
import { YeuToPhiDialogComponent } from "../../Dialog/YeuToPhi/yeutophi-dialog.component";
import { NhomDoiTuongDialogComponent } from "../../Dialog/NhomDoiTuong/nhomdoituong-dialog.component";
import { TienTeDialogComponent } from "../../Dialog/TienTe/tiente-dialog.component";
@Component({
  selector: "app-soquytienmat",
  templateUrl: "./soquytienmat.component.html",
  styleUrls: ["./soquytienmat.component.css"],
})
export class SoQuyTienMatComponent implements OnInit {
  public modalAddEdit: ModalDirective;
  @ViewChild("dateRangeSection") dateRangeSection: ElementRef;

  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public fromDateTR: Date = new Date();
  public toDateTR: Date = new Date();

  public chungtus: any[] = [];
  public nametable = "Sổ Quỹ Tiền Mặt";
  public don_vi: string = "0103542639";

  public ma_tk: string = "111";
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
    this.toDate.setDate(new Date().getDate());
    this.loadData();

    if (this.chungtus) {
      this.psco = this.chungtus.reduce(
        (sum, nhapkho) => sum + nhapkho.PS_CO,
        0,
      );
      console.log(this.psco);
    }
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
      this.chungtus = response || [];

      // ✅ TÍNH TOÁN
      if (this.chungtus.length > 0) {
        this.psco = this.chungtus.reduce(
          (sum, nhapkho) => sum + nhapkho.PS_CO,
          0,
        );

        this.psno = this.chungtus.reduce(
          (sum, nhapkho) => sum + nhapkho.PS_NO,
          0,
        );

        this.TotalDuCuoi();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    this.groupData();
    this.currentPage = 1;
    this.updatePagedData();
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
  openNSPDialog() {
    const dialogRef = this.modalService.show(NhomSanPhamDialogComponent, {
      initialState: {
        bitLoaiNL: 16,
      },
      class: "modal-xl",
    });
    dialogRef.content.nhomSanPhamSelected.subscribe((selectedNSP: any) => {
      this.ID_NHOM_SP = selectedNSP.ID_NHOM_NL;
      this.ma_nhom_sp = selectedNSP.MA_NHOM_NL;
      this.ten_nhom_sp = selectedNSP.TEN_NHOM_NL;
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
  openTTDialog() {
    const dialogRef = this.modalService.show(TienTeDialogComponent);
    dialogRef.content.tienTeSelected.subscribe((selectedTT: any) => {
      this.ID_TT = selectedTT.ID_TT;
      this.ma_tt = selectedTT.MA_TT;
      this.ten_tt = selectedTT.TEN_TT;
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
  onChangePageSize() {
    this.loadData();
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
  groupedData: any[] = [];
  pagedData: any[] = [];

  pageSize = 5; // số nhóm, KHÔNG phải số dòng
  currentPage = 1;

  groupData() {
    const map = new Map();

    this.chungtus.forEach((item) => {
      if (!map.has(item.SO_CT)) {
        map.set(item.SO_CT, []);
      }
      map.get(item.SO_CT).push(item);
    });

    this.groupedData = Array.from(map.values());
  }
  get totalPages(): number {
    return Math.ceil(this.groupedData.length / this.pageSize);
  }

  updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedData = this.groupedData.slice(start, end);
  }
  goToPage(page: number) {
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

    let l;
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
}
