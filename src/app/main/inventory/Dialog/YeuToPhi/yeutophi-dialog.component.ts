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
  danhSachYeuToPhiGoc: any[] = [];
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
      this.danhSachYeuToPhiGoc = response;
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
    const keyword = this.searchTerm?.trim();

    if (!keyword) {
      this.danhSachYeuToPhi = [...this.danhSachYeuToPhiGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachYeuToPhi = this.danhSachYeuToPhiGoc.filter((ytp) => {
      const tenRaw = (ytp.TEN_YTP || "").toLowerCase();
      const tenNormalized = this.normalizeString(ytp.TEN_YTP);

      const maRaw = (ytp.MA_YTP || "").toLowerCase();

      return (
        // tìm theo mã yếu tố phí
        maRaw.includes(rawSearch) ||
        // tìm theo tên có dấu
        tenRaw.includes(rawSearch) ||
        // tìm theo tên không dấu
        tenNormalized.includes(normalizedSearch)
      );
    });
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
