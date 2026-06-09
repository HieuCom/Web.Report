import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenService } from "src/app/core/services/authen.service";
import { ColuminfoService } from "src/app/core/services/columinfo.service";
import { DataService } from "src/app/core/services/data.service";

@Component({
  selector: "app-candoiketoan",
  templateUrl: "./print-candoiketoan.component.html",
  styleUrls: ["./print-candoiketoan.component.css"],
})
export class PrintCanDoiKeToanComponent implements OnInit {
  public fromDate: string = "";
  public toDate: string = "";
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public nametable: string;
  public columnInfochungtu: any[];
  public maTk: string;

  constructor(
    private _dataService: DataService,
    private route: ActivatedRoute,
    private columnInfoService: ColuminfoService,
    private _authenService: AuthenService,
    private location: Location,
  ) {}

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);

    //get param from component
    this.columnInfoService.currentColumnInfo.subscribe(
      (columnInfo) => (this.columnInfochungtu = columnInfo),
    );
    this.route.queryParams.subscribe((params) => {
      this.fromDate = params["fromDate"];
      this.toDate = params["toDate"];
      this.nametable = params["nametable"];
      this.maTk = params["ma_tk"];
    });

    this.chungtus = history.state.chungtus;
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
      this._dataService.post("/commands", params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].ID_DT;
        }
      });
    }
  }
  goBack() {
    this.location.back();
  }
}
