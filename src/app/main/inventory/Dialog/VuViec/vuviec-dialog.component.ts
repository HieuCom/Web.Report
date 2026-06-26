import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-vuviec-dialog",
  templateUrl: "./vuviec-dialog.component.html",
  styleUrls: ["./vuviec-dialog.component.css"],
})
export class VuViecDialogComponent implements OnInit {
  @Output() vuViecSelected = new EventEmitter<number>();
  danhSachVuViec: any[];
  danhSachVuViecGoc: any[] = [];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataVuViec();
  }

  async loadDataVuViec() {
    try {
      const response: any = await this.dataService.get("/VuViec").toPromise();
      this.danhSachVuViec = response;
      this.danhSachVuViecGoc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonVuViec(ID_VV: number) {
    const selectedVuViec = this.danhSachVuViec.find(
      (vuViec) => vuViec.ID_VV === ID_VV,
    );
    if (selectedVuViec) {
      this.vuViecSelected.emit(selectedVuViec);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachVuViec() {
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachVuViec = [...this.danhSachVuViecGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachVuViec = this.danhSachVuViecGoc.filter((vuViec) => {
      const tenRaw = (vuViec.TEN_VV || "").toLowerCase();
      const tenNormalized = this.normalizeString(vuViec.TEN_VV || "");

      const maRaw = (vuViec.MA_VV || "").toLowerCase();

      return (
        maRaw.includes(rawSearch) ||
        tenRaw.includes(rawSearch) ||
        tenNormalized.includes(normalizedSearch)
      );
    });
  }

  public columnInfonhapvuViec: any[] = [
    {
      Name: "ID_VV",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_VV",
      Caption: "Mã vụ việc",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_VV",
      Caption: "Tên vụ việc",
      Width: 80,
      Format: "",
    },
  ];
}
