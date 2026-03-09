import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NavigationExtras, Router } from "@angular/router";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { SharedDataService } from "src/app/core/services/shared-data.service";
import { KhoDialogComponent } from "src/app/main/inventory/Dialog/Kho/kho-dialog.component";
import { NguonLucDialogComponent } from "src/app/main/inventory/Dialog/NguonLuc/nguonluc-dialog.component";

@Component({
  selector: "app-nhapxuatton",
  templateUrl: "./nhapxuatton.component.html",
  styleUrls: ["./nhapxuatton.component.css"],
})
export class NhapXuatTonComponent implements OnInit {
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
  public nhapkhos: any[];
  public danhSachKho: any[] = [];
  public nametable = "SỔ CHI TIẾT HÀNG HÓA";

  public ID_KHO: number = 0;

  public ma_tk: number = 1331;
  public ma_kho: string = "";
  public ten_kho: string = "";
  public ma_nl: string = "";
  public ten_nl: string = "";
  public ID_NL: number = 0;
  public namekho: string;
  public namewh: string;

  bsModalRef: BsModalRef;

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router,
    private columnInfoService: ColuminfoService,
    private sharedDataService: SharedDataService,

    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.fromDate.setDate(1);
    this.toDate.setDate;
    this.loadData();
  }

  private getNowUTC(now: Date) {
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  }

  async loadData() {
    try {
      const response: any = await this.dataService
        .postCanDoiKeToan("/NhapXuatTon", {
          TU_NGAY: this.getNowUTC(this.fromDate),
          DEN_NGAY: this.getNowUTC(this.toDate),
          ID_DV: "1",
          ID_KHO: this.ID_KHO,
          ID_NHOM_NL: "0",
          ID_NL: this.ID_NL,
        })
        .toPromise();
      this.nhapkhos = response;
      this.nhapkhos.sort((a, b) =>
        a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  chuyen() {
    let navigationExtras: NavigationExtras = {
      state: {
        chungtus: this.nhapkhos.sort((a, b) =>
          a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
        ),
      },
    };

    const data = {
      fromDate: this.fromDate.toISOString().slice(0, 10),
      toDate: this.toDate.toISOString().slice(0, 10),
      nametable: this.nametable,
      chungtus: this.nhapkhos,
      ID_KHO: this.ID_KHO,
      ID_NL: this.ID_NL,
    };

    this.sharedDataService.updateData(data);
    this.router.navigate(["/main/inventory/printNXT"], navigationExtras);
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
      Name: "MA_NHOM_NL",
      Caption: "Nhóm NL",
      Width: 50,
      Format: "",
    },

    {
      Name: "MA_NL",
      Caption: "Mã HH/VT",
      Width: 50,
      Format: "",
    },
    {
      Name: "TEN_NL",
      Caption: "Tên HH/VT",
      Width: 50,
      Format: "",
    },

    {
      Name: "TEN_DVT",
      Caption: "ĐVT",
      Width: 30,
      Format: "",
    },
    {
      Name: "LUONG_DK",
      Caption: "Lượng đầu kỳ",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
    {
      Name: "TIEN_DK",
      Caption: "Tiền ĐK",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },

    {
      Name: "LUONG_NHAP",
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
      Name: "LUONG_XUAT",
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
      Name: "LUONG_TON",
      Caption: "Số lượng tồn",
      Width: 30,
      Format: "",
    },
    {
      Name: "TIEN_TON",
      Caption: "Tiền tồn",
      Width: 30,
      Format: "#,##0.##;(#,##0.##);#",
    },
  ];
}
