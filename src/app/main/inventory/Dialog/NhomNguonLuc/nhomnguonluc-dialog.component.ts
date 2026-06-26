import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-nhomnguonluc-dialog",
  templateUrl: "./nhomnguonluc-dialog.component.html",
  styleUrls: ["./nhomnguonluc-dialog.component.css"],
})
export class NhomNguonLucDialogComponent implements OnInit {
  @Output() nhomNguonLucSelected = new EventEmitter<number>();
  danhSachNhomNguonLuc: any[];
  danhSachNhomNguonLucGoc: any[] = [];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataNhomNguonLuc();
  }

  async loadDataNhomNguonLuc() {
    try {
      const response: any = await this.dataService
        .get("/NhomNguonLuc")
        .toPromise();
      this.danhSachNhomNguonLuc = response;
      this.danhSachNhomNguonLucGoc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonNhomNguonLuc(ID_NHOM_NL: number) {
    const selectedNhomNguonLuc = this.danhSachNhomNguonLuc.find(
      (nhomNguonLuc) => nhomNguonLuc.ID_NHOM_NL === ID_NHOM_NL,
    );
    if (selectedNhomNguonLuc) {
      this.nhomNguonLucSelected.emit(selectedNhomNguonLuc);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachNhomNguonLuc() {
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachNhomNguonLuc = [...this.danhSachNhomNguonLucGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachNhomNguonLuc = this.danhSachNhomNguonLucGoc.filter(
      (nhomNguonLuc) => {
        const tenRaw = (nhomNguonLuc.TEN_NHOM_NL || "").toLowerCase();
        const tenNormalized = this.normalizeString(
          nhomNguonLuc.TEN_NHOM_NL || "",
        );

        const maRaw = (nhomNguonLuc.MA_NHOM_NL || "").toLowerCase();

        return (
          // 🔥 tìm theo mã nhóm nguồn lực
          maRaw.includes(rawSearch) ||
          // 🔥 tìm theo tên có dấu
          tenRaw.includes(rawSearch) ||
          // 🔥 tìm theo tên không dấu
          tenNormalized.includes(normalizedSearch)
        );
      },
    );
  }

  public columnInfonhapnhomNguonLuc: any[] = [
    {
      Name: "ID_NHOM_NL",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_NHOM_NL",
      Caption: "Mã nhóm nguồn lực",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_NHOM_NL",
      Caption: "Tên nhóm nguồn lực",
      Width: 80,
      Format: "",
    },
  ];
}
