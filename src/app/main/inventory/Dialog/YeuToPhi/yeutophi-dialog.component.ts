import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-yeutophi-dialog",
  templateUrl: "./yeutophi-dialog.component.html",
  styleUrls: ["./yeutophi-dialog.component.css"],
})
export class YeuToPhiDialogComponent implements OnInit {
  @Output() yeuToPhiSelected = new EventEmitter<number>();
  danhSachYeuToPhi: any[];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDataYeuToPhi();
  }

  async loadDataYeuToPhi() {
    try {
      const response: any = await this.dataService.get("/YeuToPhi").toPromise();
      this.danhSachYeuToPhi = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonYeuToPhi(ID_YTP: number) {
    const selectedYeuToPhi = this.danhSachYeuToPhi.find(
      (yeuToPhi) => yeuToPhi.ID_YTP === ID_YTP,
    );
    if (selectedYeuToPhi) {
      this.yeuToPhiSelected.emit(selectedYeuToPhi);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachYeuToPhi() {
    if (!this.searchTerm) {
      this.loadDataYeuToPhi(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachYeuToPhi = this.danhSachYeuToPhi.filter((yeuToPhi) =>
        this.normalizeString(yeuToPhi.TEN_YTP).includes(normalizedSearchTerm),
      );
    }
  }

  public columnInfonhapyeuToPhi: any[] = [
    {
      Name: "ID_YTP",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_YTP",
      Caption: "Mã yếu tố phí",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_YTP",
      Caption: "Tên yếu tố phí",
      Width: 80,
      Format: "",
    },
  ];
}
