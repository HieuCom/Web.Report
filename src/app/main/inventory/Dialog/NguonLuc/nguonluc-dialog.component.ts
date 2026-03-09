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
  selector: "app-nguonluc-dialog",
  templateUrl: "./nguonluc-dialog.component.html",
  styleUrls: ["./nguonluc-dialog.component.css"],
})
export class NguonLucDialogComponent implements OnInit {
  @Output() nguonLucSelected = new EventEmitter<number>();
  danhSachNguonLuc: any[];
  public searchTerm: string = "";

  constructor(
    private dataService: DataService,
    private _notificationService: NotificationService,
  ) {}

  ngOnInit() {
    //this.loadDanhSachNguonLuc();
    this.loadDataNguonLuc();
  }

  async loadDataNguonLuc() {
    try {
      const response: any = await this.dataService.get("/NguonLuc").toPromise();
      this.danhSachNguonLuc = response;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  chonNguonLuc(ID_NL: number) {
    const selectedNguonLuc = this.danhSachNguonLuc.find(
      (nguonLuc) => nguonLuc.ID_NL === ID_NL,
    );
    if (selectedNguonLuc) {
      this.nguonLucSelected.emit(selectedNguonLuc);
    }
  }
  normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  filterDanhSachNguonLuc() {
    if (!this.searchTerm) {
      this.loadDataNguonLuc(); // Reload the original list if the search term is empty
    } else {
      const normalizedSearchTerm = this.normalizeString(this.searchTerm);
      this.danhSachNguonLuc = this.danhSachNguonLuc.filter((nguonLuc) =>
        this.normalizeString(nguonLuc.TEN_NL).includes(normalizedSearchTerm),
      );
    }
  }

  public columnInfonhapnguonLuc: any[] = [
    {
      Name: "ID_NL",
      Caption: "ID",
      Width: 80,
      Format: "",
    },
    {
      Name: "MA_NL",
      Caption: "Mã nguồn lực",
      Width: 80,
      Format: "",
    },
    {
      Name: "TEN_NL",
      Caption: "Tên nguồn lực",
      Width: 80,
      Format: "",
    },
  ];
}
