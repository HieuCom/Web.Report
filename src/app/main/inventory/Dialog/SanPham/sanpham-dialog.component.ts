import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-sanpham-dialog",
  templateUrl: "./sanpham-dialog.component.html",
  styleUrls: ["./sanpham-dialog.component.css"],
})
export class SanPhamDialogComponent implements OnInit {
  @Output() sanPhamSelected = new EventEmitter<number>();
  bitLoaiNL: number;
  danhSachSanPham: any[] = [];
  danhSachSanPhamGoc: any[] = [];
  public searchTerm: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadDataSanPham();
  }

  async loadDataSanPham() {
    try {
      const response: any = await this.dataService.get("/NguonLuc").toPromise();
      this.danhSachSanPhamGoc = response;

      if (this.bitLoaiNL !== undefined && this.bitLoaiNL !== null) {
        this.danhSachSanPham = response.filter(
          (nl) => (nl.BIT_LOAI_NL & this.bitLoaiNL) === this.bitLoaiNL,
        );
      } else {
        this.danhSachSanPham = response;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonSanPham(ID_NL: number) {
    const selectedSanPham = this.danhSachSanPham.find(
      (sanPham) => sanPham.ID_NL === ID_NL,
    );
    if (selectedSanPham) {
      this.sanPhamSelected.emit(selectedSanPham);
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
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachSanPham() {
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachSanPham = [...this.danhSachSanPhamGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachSanPham = this.danhSachSanPhamGoc.filter((sanPham) => {
      const tenRaw = sanPham.TEN_NL.toLowerCase();
      const tenNormalized = this.normalizeString(sanPham.TEN_NL);

      return (
        tenRaw.includes(rawSearch) || tenNormalized.includes(normalizedSearch)
      );
    });
  }

  public columnInfonhapsanPham: any[] = [
    {
      Name: "ID_NL",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_NL",
      Caption: "Mã sản phẩm",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_NL",
      Caption: "Tên sản phẩm",
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
