import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-kho-dialog",
  templateUrl: "./kho-dialog.component.html",
  styleUrls: ["./kho-dialog.component.css"],
})
export class KhoDialogComponent implements OnInit {
  @Output() khoSelected = new EventEmitter<number>();
  danhSachKho: any[];
  danhSachKhoGoc: any[] = [];
  public searchTerm: string = "";
  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    //this.loadDanhSachKho();
    this.loadDataKho();
  }

  async loadDataKho() {
    try {
      const response: any = await this.dataService.getKho("/Kho").toPromise();
      this.danhSachKho = response;
      this.danhSachKhoGoc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonKho(ID_KHO: number) {
    const selectedKho = this.danhSachKho.find((kho) => kho.ID_KHO === ID_KHO);
    if (selectedKho) {
      this.khoSelected.emit(selectedKho);
    }
  }

  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachKho() {
    const keyword = this.searchTerm?.trim();

    // Nếu ô tìm kiếm rỗng → trả lại danh sách gốc
    if (!keyword) {
      this.danhSachKho = [...this.danhSachKhoGoc];
      return;
    }

    const rawSearch = keyword.toLowerCase();
    const normalizedSearch = this.normalizeString(keyword);

    this.danhSachKho = this.danhSachKhoGoc.filter((kho) => {
      const tenRaw = kho.TEN_KHO.toLowerCase();
      const tenNormalized = this.normalizeString(kho.TEN_KHO);

      return (
        tenRaw.includes(rawSearch) || tenNormalized.includes(normalizedSearch)
      );
    });
  }

  public columnInfonhapkho: any[] = [
    {
      Name: "ID_KHO",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_KHO",
      Caption: "Mã Kho",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_KHO",
      Caption: "Tên Kho",
      Width: 80,
      Format: "",
    },
  ];
}
