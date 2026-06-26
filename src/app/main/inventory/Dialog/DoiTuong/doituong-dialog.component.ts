import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-doituong-dialog",
  templateUrl: "./doituong-dialog.component.html",
  styleUrls: ["./doituong-dialog.component.css"],
})
export class DoiTuongDialogComponent implements OnInit {
  @Output() doiTuongSelected = new EventEmitter<number>();
  danhSachDoiTuong: any[];
  danhSachDoiTuongGoc: any[] = [];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataDoiTuong();
  }

  async loadDataDoiTuong() {
    try {
      const response: any = await this.dataService.get("/DoiTuong").toPromise();
      this.danhSachDoiTuongGoc = response;
      this.danhSachDoiTuong = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  chonDoiTuong(ID_DT: number) {
    const selectedDoiTuong = this.danhSachDoiTuong.find(
      (doiTuong) => doiTuong.ID_DT === ID_DT,
    );
    if (selectedDoiTuong) {
      this.doiTuongSelected.emit(selectedDoiTuong);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachDoiTuong() {
    const keyword = this.searchTerm?.trim();

    // Nếu rỗng → trả lại dữ liệu gốc
    if (!keyword) {
      this.danhSachDoiTuong = [...this.danhSachDoiTuongGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachDoiTuong = this.danhSachDoiTuongGoc.filter((dt) => {
      const tenRaw = (dt.TEN_DT || "").toLowerCase();
      const tenNormalized = this.normalizeString(dt.TEN_DT || "");

      const maRaw = (dt.MA_DT || "").toLowerCase();

      return (
        // tìm theo mã đối tượng
        maRaw.includes(rawSearch) ||
        // tìm theo tên có dấu
        tenRaw.includes(rawSearch) ||
        // tìm theo tên không dấu
        tenNormalized.includes(normalizedSearch)
      );
    });
  }

  public columnInfonhapdoiTuong: any[] = [
    {
      Name: "ID_DT",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_DT",
      Caption: "Mã đối tượng",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_DT",
      Caption: "Tên đối tượng",
      Width: 80,
      Format: "",
    },
  ];
}
