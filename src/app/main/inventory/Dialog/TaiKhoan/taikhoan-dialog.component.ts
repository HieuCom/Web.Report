import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-taikhoan-dialog",
  templateUrl: "./taikhoan-dialog.component.html",
  styleUrls: ["./taikhoan-dialog.component.css"],
})
export class TaiKhoanDialogComponent implements OnInit {
  @Output() taikhoanSelected = new EventEmitter<number>();
  danhSachTaiKhoan: any[];
  danhSachTaiKhoanGoc: any[] = [];
  public searchTerm: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //this.loadDanhSachTaiKhoan();
    this.loadDataTaiKhoan();
  }

  async loadDataTaiKhoan() {
    try {
      const response: any = await this.dataService.get("/TaiKhoan").toPromise();
      this.danhSachTaiKhoan = response;
      this.danhSachTaiKhoanGoc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  chonTaiKhoan(maTaiKhoan: string) {
    const selectedTaiKhoan = this.danhSachTaiKhoan.find(
      (TaiKhoan) => TaiKhoan.MA_TK === maTaiKhoan,
    );
    if (selectedTaiKhoan) {
      this.taikhoanSelected.emit(selectedTaiKhoan.MA_TK);
    }
  }

  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachTaiKhoan() {
    const keyword = this.searchTerm?.trim();

    if (!keyword) {
      this.danhSachTaiKhoan = [...this.danhSachTaiKhoanGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachTaiKhoan = this.danhSachTaiKhoanGoc.filter((taikhoan) => {
      const tenRaw = (taikhoan.TEN_TK || "").toLowerCase();
      const tenNormalized = this.normalizeString(taikhoan.TEN_TK || "");

      const maRaw = (taikhoan.MA_TK || "").toLowerCase();

      return (
        // tìm theo tên có dấu / không dấu
        tenRaw.includes(rawSearch) ||
        tenNormalized.includes(normalizedSearch) ||
        // 🔥 thêm tìm theo mã tài khoản
        maRaw.includes(rawSearch)
      );
    });
  }

  public columnInfonhapTaiKhoan: any[] = [
    {
      Name: "MA_TK",
      Caption: "Mã TK",
      Width: 80,
      Format: "",
    },

    {
      Name: "TEN_TK",
      Caption: "Tên tài khoản",
      Width: 80,
      Format: "",
    },
  ];
}
