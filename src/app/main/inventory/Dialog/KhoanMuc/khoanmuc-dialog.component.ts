import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-khoanmuc-dialog",
  templateUrl: "./khoanmuc-dialog.component.html",
  styleUrls: ["./khoanmuc-dialog.component.css"],
})
export class KhoanMucDialogComponent implements OnInit {
  @Output() khoanMucSelected = new EventEmitter<number>();
  danhSachKhoanMuc: any[];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataKhoanMuc();
  }

  async loadDataKhoanMuc() {
    try {
      const response: any = await this.dataService.get("/KhoanMuc").toPromise();
      this.danhSachKhoanMuc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonKhoanMuc(ID_KM: number) {
    const selectedKhoanMuc = this.danhSachKhoanMuc.find(
      (khoanMuc) => khoanMuc.ID_KM === ID_KM,
    );
    if (selectedKhoanMuc) {
      this.khoanMucSelected.emit(selectedKhoanMuc);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachKhoanMuc() {
    if (!this.searchTerm) {
      this.loadDataKhoanMuc(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachKhoanMuc = this.danhSachKhoanMuc.filter((khoanMuc) =>
        this.normalizeString(khoanMuc.TEN_KM).includes(normalizedSearchTerm),
      );
    }
  }

  public columnInfonhapkhoanMuc: any[] = [
    {
      Name: "ID_KM",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_KM",
      Caption: "Mã khoản mục",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_KM",
      Caption: "Tên khoản mục",
      Width: 80,
      Format: "",
    },
  ];
}
