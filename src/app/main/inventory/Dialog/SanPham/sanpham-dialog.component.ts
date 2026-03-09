import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-sanpham-dialog",
  templateUrl: "./sanpham-dialog.component.html",
  styleUrls: ["./sanpham-dialog.component.css"],
})
export class SanPhamDialogComponent implements OnInit {
  @Output() sanPhamSelected = new EventEmitter<number>();
  danhSachSanPham: any[];
  public searchTerm: string = "";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //this.loadDanhSachNguonLuc();
    this.loadDataSanPham();
  }

  async loadDataSanPham() {
    try {
      const response: any = await this.dataService.get("/NguonLuc").toPromise();
      this.danhSachSanPham = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonSanPham(ID_SP: number) {
    const selectedSanPham = this.danhSachSanPham.find(
      (sanPham) => sanPham.ID_SP === ID_SP,
    );
    if (selectedSanPham) {
      this.sanPhamSelected.emit(selectedSanPham);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachSanPham() {
    if (!this.searchTerm) {
      this.loadDataSanPham(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachSanPham = this.danhSachSanPham.filter((sanPham) =>
        this.normalizeString(sanPham.TEN_SP).includes(normalizedSearchTerm),
      );
    }
  }

  public columnInfonhapsanPham: any[] = [
    {
      Name: "ID_SP",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_SP",
      Caption: "Mã sản phẩm",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_SP",
      Caption: "Tên sản phẩm",
      Width: 80,
      Format: "",
    },
  ];
}
