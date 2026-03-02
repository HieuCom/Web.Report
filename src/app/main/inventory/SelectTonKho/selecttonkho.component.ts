import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import PSCTJSON from 'src/assets/json/PSCTForm.json';

@Component({
  selector: 'app-SelectTonKho',
  templateUrl: './selecttonkho.component.html',
  styleUrls: ['./selecttonkho.component.css']
})
export class SelectTonKhoComponent implements OnInit {
  title: string;
  list: any[] = [];
  errors: any = {};
  loading = false;
  id: number = 0;
  PSTH: any = {};
  NGAY_CT: any;
  ID_DT: number = 0;
  ID_KHO: number = 0;
  initTiny = {
    base_url: '/tinymce',
    height: 250,
    language: 'vi_VN',
    skin_url: './assets/tinymce/skins/lightgray',
    language_url: './assets/tinymce/langs/vi_VN.js',
    plugins: "autosave autolink code codesample colorpicker emoticons fullscreen hr preview table textcolor wordcount",
    toolbar: "undo redo forecolor cut copy paste fontselect styleselect bold italic link preview code alignleft aligncenter alignright alignjustify",

  }
  PSCT: any[] = [];
  descriptionTask: string;
  public event: EventEmitter<any> = new EventEmitter();
  bsValue = new Date();
  extenalSelectTonKho: any;
  maxProgressbar: number = 0;
  progressing: number = 0;
  userLoginId: any;
  userList: any;
  khoList: any;
  tienteList: any;
  doituongList: any;
  PSCTColumn = PSCTJSON.PSCTForm.TonKhoInfo;
  checkBoxValue: any[] = [];
  public pageNumber: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filterKeyword = '';

  constructor(public bsModalRef: BsModalRef,
    private notificationService: NotificationService,
    private _authenService: AuthenService,
    private formBuilder: FormBuilder,
    private formErrors: FormErrors,
    private dataService: DataService,) {
    this.initForm();
  }

  isChecked = false;
  checkuncheckall() {
    if (this.isChecked == true) {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }

  }
  ngOnInit(): void {
    var user = this._authenService.getLoggedInUser();
    this.loadData();
  }


  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadData();
  }
  onChangePageSize() {
    this.loadData();
  }

  async getUserIdLogin(userName) {
    if (userName) {
      let data = [];
      data.push("@UserName", userName);
      let params = { "CommandText": "uspUser___FindUserName", "CommandType": 1025, "Parameters": data }
      await this.dataService.post('/commands', params).subscribe((response: any) => {
        if (response.Data) {
          this.userLoginId = response.Data[0].Id;
        }
      });
    }
  }

  initForm() {

  }
  triggerEvent(SelectTonKho: any[]) {
    this.event.emit({ SelectTonKho });
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  async loadData() {
    let data = [];
    data.push(
      "@DEN_NGAY", this.PSTH.NGAY_CT,
      "@ID_KHO", this.PSTH.ID_KHO,
      "@ID_DT", this.PSTH.ID_DT,
      "@ID_PSCT_N", 0,
      "@ID_PSCT_X", 0,
      "@PageNumber", this.pageNumber,
      "@PageSize", this.pageSize,
      "@Keyword",this.filterKeyword);

    let params = { "CommandText": "uspTonDichDanhChiTiet_Page", "CommandType": 1025, "Parameters": data }
    await this.dataService.post('/commands/paged', params).subscribe((response: any) => {
      this.PSCT = response.Data;      
      this.totalRow = response.Data[0].TotalItems
    });
  }

  onSubmit() {
    this.triggerEvent(this.checkBoxValue);
    this.bsModalRef.hide();
  }

  onChange(value: any) {
    if (value.chonton == true) {
      value.SO_LUONG_GUI = value.SL_TON
      this.checkBoxValue.push(value)
    }
  }
  onSearch(value: any){
  }
}

