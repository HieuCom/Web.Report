import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-tiente-dialog",
  templateUrl: "./tiente-dialog.component.html",
  styleUrls: ["./tiente-dialog.component.css"],
})
export class TienTeDialogComponent implements OnInit {
  @Output() tienTeSelected = new EventEmitter<number>();
  danhSachTienTe: any[];
  danhSachTienTeGoc: any[] = [];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataTienTe();
  }

  async loadDataTienTe() {
    try {
      const response: any = await this.dataService.get("/TienTe").toPromise();
      this.danhSachTienTe = response;
      this.danhSachTienTeGoc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonTienTe(ID_TT: number) {
    const selectedTienTe = this.danhSachTienTe.find(
      (tienTe) => tienTe.ID_TT === ID_TT,
    );
    if (selectedTienTe) {
      this.tienTeSelected.emit(selectedTienTe);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachTienTe() {
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachTienTe = [...this.danhSachTienTeGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachTienTe = this.danhSachTienTeGoc.filter((tienTe) => {
      const tenRaw = tienTe.TEN_TT.toLowerCase();
      const tenNormalized = this.normalizeString(tienTe.TEN_TT);

      return (
        tenRaw.includes(rawSearch) || tenNormalized.includes(normalizedSearch)
      );
    });
  }

  public columnInfonhaptienTe: any[] = [
    {
      Name: "ID_TT",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_TT",
      Caption: "Mã tiền tệ",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_TT",
      Caption: "Tên tiền tệ",
      Width: 80,
      Format: "",
    },
  ];
}
