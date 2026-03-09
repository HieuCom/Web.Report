import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-nhomsanpham-dialog",
  templateUrl: "./nhomsanpham-dialog.component.html",
  styleUrls: ["./nhomsanpham-dialog.component.css"],
})
export class NhomSanPhamDialogComponent implements OnInit {
  @Output() nhomSanPhamSelected = new EventEmitter<number>();
  danhSachNhomSanPham: any[];
  danhSachNhomSanPhamGoc: any[] = [];
  public searchTerm: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadDataNhomSanPham();
  }

  async loadDataNhomSanPham() {
    try {
      const response: any = await this.dataService
        .get("/NhomNguonLuc")
        .toPromise();
      this.danhSachNhomSanPhamGoc = response;
      this.danhSachNhomSanPham = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonNhomSanPham(ID_NHOM_NL: number) {
    const selectedNhomSanPham = this.danhSachNhomSanPham.find(
      (nhomSanPham) => nhomSanPham.ID_NHOM_NL === ID_NHOM_NL,
    );
    if (selectedNhomSanPham) {
      this.nhomSanPhamSelected.emit(selectedNhomSanPham);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachNhomSanPham() {
    if (!this.searchTerm) {
      this.loadDataNhomSanPham(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachNhomSanPham = this.danhSachNhomSanPham.filter(
        (nhomSanPham) =>
          this.normalizeString(nhomSanPham.TEN_NHOM_NL).includes(
            normalizedSearchTerm,
          ),
      );
    }
  }

  LOAI_NGUON_LUC = {
    KHAC: 0,
    VAT_TU: 1,
    VAT_TU_PHU: 2,
    BAN_THANH_PHAM: 4,
    THANH_PHAM: 8,
    SAN_PHAM: 16,
    HANG_HOA: 32,
    DICH_VU: 64,
    TAI_SAN: 128,
    CONG_CU_DUNG_CU: 256,
  };

  public columnInfonhapnhomSanPham: any[] = [
    {
      Name: "ID_NHOM_NL",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_NHOM_NL",
      Caption: "Mã nhóm sản phẩm",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_NHOM_NL",
      Caption: "Tên nhóm sản phẩm",
      Width: 80,
      Format: "",
    },
  ];
}
