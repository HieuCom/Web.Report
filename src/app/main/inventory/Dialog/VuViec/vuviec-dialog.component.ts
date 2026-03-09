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
    if (!this.searchTerm) {
      this.loadDataVuViec(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachVuViec = this.danhSachVuViec.filter((vuViec) =>
        this.normalizeString(vuViec.TEN_VV).includes(normalizedSearchTerm),
      );
    }
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
