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
import { Location } from "@angular/common";

@Component({
  selector: "app-printBKCT",
  templateUrl: "./preview-sqtm.component.html",
  styleUrls: ["./soquytienmat.component.css"],
})
export class PreviewSQTMComponent implements OnInit {
  public fromDate: string = "";
  public toDate: string = "";
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  public ma_tk: string;

  public nametable: string;
  public psco: number;
  public psno: number;

  public dauky: number;
  public nodauky: number;
  public codauky: number;
  public nocuoiky: number;
  public cocuoiky: number;
  public showDiv: boolean = true;

  public headHtml: SafeHtml;
  public rowHtml: SafeHtml;

  constructor(
    private _dataService: DataService,
    private route: ActivatedRoute,
    private _authenService: AuthenService,
    private location: Location,
  ) {}

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.getUserIdLogin(user.username);

    //get param from component

    this.route.queryParams.subscribe((params) => {
      this.fromDate = params["fromDate"];
      this.toDate = params["toDate"];
      this.nametable = params["nametable"];
      this.dauky = params["dauky"];
      this.nodauky = params["nodauky"];
      this.codauky = params["codauky"];
      this.nocuoiky = params["nocuoiky"];
      this.cocuoiky = params["cocuoiky"];
      this.psco = params["psco"];
      this.psno = params["psno"];
      this.ma_tk = params["ma_tk"];
      // .split('-').reverse().join('/')
    });

    this.chungtus = history.state.chungtus;
    this.chungtus.sort((a, b) =>
      a.SO_CT > b.SO_CT ? 1 : b.SO_CT > a.SO_CT ? -1 : 0,
    );
    //this.loadData();
  }

  getTotal(chungtus, groupName, field) {
    return chungtus
      .filter((chungtu) => chungtu.SO_CT === groupName)
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
}
