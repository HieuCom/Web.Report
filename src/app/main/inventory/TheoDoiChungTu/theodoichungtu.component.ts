import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-theodoichungtu',
  templateUrl: './theodoichungtu.component.html',
  styleUrls: ['./theodoichungtu.component.css']
})
export class TheoDoiChungTuComponent implements OnInit {
  public fromDate: Date = new Date();
  public toDate: Date = new Date();
  public chungtus: any[];
  public pageNumber: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public userLoginId: number;
  constructor(private _dataService: DataService,
    private _authenService: AuthenService) {
  }

  ngOnInit() {
    var user = this._authenService.getLoggedInUser();
    this.fromDate.setDate(1);
    this.toDate.setDate
    this.getUserIdLogin(user.username);
    this.loadData();
  }
  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspDoiTuong___FindUserName", "CommandType": 1025, "Parameters": data }
      await this._dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].ID_DT;
        }
      });
    }
  }
  onValueChangeDateRange(rangeDate) {
    if (rangeDate != undefined) {
      this.fromDate = rangeDate;
      this.loadData();
    }
  }
  onValueChangeDateRange2(rangeDate2) {
    if (rangeDate2 != undefined) {
      this.toDate = rangeDate2;
      this.loadData();
    }
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }
  async loadData() {
    let data = [];
    data.push(
      "@TU_NGAY", this.fromDate,
      "@DEN_NGAY", this.toDate,
      "@ID_DT", this.userLoginId,
      "@PageNumber", this.pageNumber,
      "@PageSize", this.pageSize)


    let params = { "CommandText": "sploadChungTuByDoiTuong", "CommandType": 1025, "Parameters": data }
    await this._dataService.post('/commands/paged', params).subscribe((response: any) => {
      if (response.Data) {
        this.chungtus = response.Data
        this.totalRow = response.Data[0].TotalItems
      }
    });
  }
  reloaddata() {
    this.loadData()
  }
  public columnInfochungtu: any[] = [
    {
      "Name": "SO_CT",
      "Caption": "Số CT",
      "Format": "",
      "Width": 90
    },
    {
      "Name": "NGAY_CT",
      "Caption": "Ngày chứng từ",
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "NGAY_XN",
      "Caption": "Ngày nhập/xuất",
      "Width": 70,
      "Format": "d"
    },
    {
      "Name": "TEN_DT",
      "Caption": "Tên khách hàng",
      "Format": "",
      "Width": 200
    },
    {
      "Name": "NGUOI_GHANG",
      "Caption": "Người giao hàng",
      "Format": "",
      "Width": 150
    },
    {
      "Name": "DIEN_GIAI",
      "Caption": "Tên hàng/Nội dung KH",
      "Format": "",
      "Width": 90
    },
    {
      "Name": "TEN_NL",
      "Caption": "Tên hàng/Nội dung KH",
      "Format": "",
      "Width": 150,
    },
    {
      "Name": "SO_KG",
      "Caption": "Số KG",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    },
    {
      "Name": "SO_LUONG",
      "Caption": "Số lượng",
      "Width": 70,
      "Format": "#,##0.##;(#,##0.##);#"
    }

  ]
}