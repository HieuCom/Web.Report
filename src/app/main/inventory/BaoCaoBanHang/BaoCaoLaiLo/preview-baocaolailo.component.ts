import { Location } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild,
  ɵɵinjectPipeChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MessageContstants } from "src/app/core/common/message.constants";
import { FormErrors } from "src/app/core/helpers/form.errors";
import { AuthenService } from "src/app/core/services/authen.service";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { DataService } from "src/app/core/services/data.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-printBCLL",
  templateUrl: "./preview-baocaolailo.component.html",
  styleUrls: ["./baocaolailo.component.css"],
})
export class PreviewBCLLComponent implements OnInit {
  public fromDate: string = "";
  public toDate: string = "";
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;

  public nametable: string;
  public namewh: string;

  public stringheadtable: string = `
  <tr>
           <th rowspan="2" class="small-column">
              Ngày
            </th>
            <th colspan="2" style="text-align: center;" class="large-column">
              SỐ CT
            </th>
       
            <th rowspan="2" class="small-column">
              DIỄN GIẢI
            </th>
           
            <th colspan="2" style="text-align: center;" class="large-column">
              SỐ TIỀN
            </th>
            <th rowspan="2" class="small-column">
            TỒN QUỸ
          </th>
          </tr>
      
          <tr>
            <th>PT</th>
            <th>PC</th>
            <th>THU</th>
            <th>CHI</th>
           
        </tr>
  
  `;
  public headHtml: SafeHtml;
  public rowHtml: SafeHtml;

  constructor(
    private _dataService: DataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService,
    private location: Location,
  ) {
    this.headHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.stringheadtable,
    );
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);

    //get param from component

    this.route.queryParams.subscribe((params) => {
      this.fromDate = params["fromDate"];
      this.toDate = params["toDate"];
      this.nametable = params["nametable"];
    });

    this.chungtus = history.state.chungtus;
    this.chungtus.sort((a, b) =>
      a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
    );
    //this.loadData();
  }

  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.MA_NL === groupName)
      .reduce((sum, chungtu) => sum + chungtu[field], 0);
  }

  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = {
        CommandText: "uspDoiTuong___FindUserName",
        CommandType: 1025,
        Parameters: data,
      };
      await this._dataService
        .post("/commands", params)
        .subscribe((response: any) => {
          if (response.Data) {
            this.userLoginId = response.Data[0].ID_DT;
          }
        });
    }
  }
  goBack() {
    this.location.back();
  }

  print() {
    const printContents = document.querySelector(".print-section")?.innerHTML;

    const popupWin = window.open("", "_blank", "width=800,height=600");

    popupWin?.document.open();
    popupWin?.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body {
            font-family: Times New Roman, Times, serif;
            padding: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          table, th, td {
            border: 1px solid black;
          }

          th, td {
            padding: 5px;
            text-align: left;
          }
          .title {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 100px;
          }
          .nametb {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
          }
          .time {
            text-align: center;
            margin-bottom: 20px;
          }
          .small-column {
            max-width: 50px; /* Điều chỉnh độ rộng của các cột lớn */
            text-align: center;
            vertical-align: middle;
          }
          .print-sign {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${printContents}
      </body>
    </html>
  `);
    popupWin?.document.close();
  }

  public columnInfonhapkho: any[] = [
    {
      Name: "MA_NL",
      Caption: "MÃ HH",
      Width: 50,
      Format: "",
    },
    {
      Name: "TEN_NL",
      Caption: "Tên Hàng",
      Width: 50,
      Format: "",
    },
    {
      Name: "TEN_DVT",
      Caption: "ĐVT",
      Width: 50,
      Format: "",
    },
    {
      Name: "SO_LUONG",
      Caption: "SL",
      Width: 70,
      Format: "",
    },

    {
      Name: "TIEN_VON",
      Caption: "Tiền Vốn",
      Width: 90,
      Format: "#,##0.##;(#,##0.##);#",
    },

    {
      Name: "TIEN_BAN",
      Caption: "Doanh Thu",
      Width: 50,
      Format: "#,##0.##;(#,##0.##);#",
    },
  ];
}
