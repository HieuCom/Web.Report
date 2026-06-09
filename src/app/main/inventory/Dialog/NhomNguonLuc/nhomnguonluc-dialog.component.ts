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
    if (!this.searchTerm) {
      this.loadDataNhomNguonLuc(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachNhomNguonLuc = this.danhSachNhomNguonLuc.filter(
        (nhomNguonLuc) =>
          this.normalizeString(nhomNguonLuc.TEN_NHOM_NL).includes(
            normalizedSearchTerm,
          ),
      );
    }
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
