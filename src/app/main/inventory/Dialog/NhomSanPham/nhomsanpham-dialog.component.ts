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
  bitLoaiNL: number;
  danhSachNhomSanPham: any[] = [];
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

      if (this.bitLoaiNL !== undefined && this.bitLoaiNL !== null) {
        this.danhSachNhomSanPham = response.filter(
          (nl) => (nl.BIT_LOAI_NL & this.bitLoaiNL) === this.bitLoaiNL,
        );
      } else {
        this.danhSachNhomSanPham = response;
      }
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
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachNhomSanPham = [...this.danhSachNhomSanPhamGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachNhomSanPham = this.danhSachNhomSanPhamGoc.filter(
      (nhomSanPham) => {
        const tenRaw = nhomSanPham.TEN_NHOM_NL.toLowerCase();
        const tenNormalized = this.normalizeString(nhomSanPham.TEN_NHOM_NL);

        return (
          tenRaw.includes(rawSearch) || tenNormalized.includes(normalizedSearch)
        );
      },
    );
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

  LOAI_NGUON_LUC_MAP: { [key: number]: string } = {
    0: "Khác",
    1: "Vật tư",
    2: "Vật tư phụ",
    4: "Bán thành phẩm",
    8: "Thành phẩm",
    16: "Sản phẩm",
    32: "Hàng hóa",
    64: "Dịch vụ",
    128: "Tài sản",
    256: "Công cụ dụng cụ",
  };

  getTenLoaiNguonLuc(bitLoai: number): string {
    if (!bitLoai || bitLoai === 0) return "Khác";

    return Object.keys(this.LOAI_NGUON_LUC_MAP)
      .map(Number)
      .filter((bit) => bit !== 0 && (bitLoai & bit) === bit)
      .map((bit) => this.LOAI_NGUON_LUC_MAP[bit])
      .join(", ");
  }
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
    {
      Name: "BIT_LOAI_NL",
      Caption: "Loại nguồn lực",
      Width: 80,
      Format: "",
    },
  ];
}
