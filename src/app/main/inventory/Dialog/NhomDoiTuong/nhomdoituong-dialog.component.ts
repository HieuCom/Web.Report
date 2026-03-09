import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-nhomdoituong-dialog",
  templateUrl: "./nhomdoituong-dialog.component.html",
  styleUrls: ["./nhomdoituong-dialog.component.css"],
})
export class NhomDoiTuongDialogComponent implements OnInit {
  @Output() nhomDoiTuongSelected = new EventEmitter<number>();
  danhSachNhomDoiTuong: any[];
  danhSachNhomDoiTuongGoc: any[] = [];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataNhomDoiTuong();
  }

  async loadDataNhomDoiTuong() {
    try {
      const response: any = await this.dataService
        .get("/NhomDoiTuong")
        .toPromise();
      this.danhSachNhomDoiTuong = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonNhomDoiTuong(ID_NHOM_DT: number) {
    const selectedNhomDoiTuong = this.danhSachNhomDoiTuong.find(
      (nhomDoiTuong) => nhomDoiTuong.ID_NHOM_DT === ID_NHOM_DT,
    );
    if (selectedNhomDoiTuong) {
      this.nhomDoiTuongSelected.emit(selectedNhomDoiTuong);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachNhomDoiTuong() {
    if (!this.searchTerm) {
      this.loadDataNhomDoiTuong(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachNhomDoiTuong = this.danhSachNhomDoiTuong.filter(
        (nhomDoiTuong) =>
          this.normalizeString(nhomDoiTuong.TEN_NHOM_DT).includes(
            normalizedSearchTerm,
          ),
      );
    }
  }

  public columnInfonhapnhomDoiTuong: any[] = [
    {
      Name: "ID_NHOM_DT",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_NHOM_DT",
      Caption: "Mã nhóm đối tượng",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_NHOM_DT",
      Caption: "Tên nhóm đối tượng",
      Width: 80,
      Format: "",
    },
  ];
}
