import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Key } from 'protractor';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { FormErrors } from 'src/app/core/helpers/form.errors';
import { AuthenService } from 'src/app/core/services/authen.service';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import DoiTuongJSON from 'src/assets/json/DoiTuongForm.json';


@Component({
  selector: 'app-doituong',
  templateUrl: './doituong.component.html',
  styleUrls: ['./doituong.component.css']
})
export class DoiTuongComponent implements OnInit {
  /*Declare modal */

  @ViewChild('addEditModal', { static: false }) public addEditModal: ModalDirective;
  @ViewChild('thumbnailImage', { static: false }) thumbnailImage;
  public entity: any;
  public totalRow: number;
  public pageNumber = 1;
  public pageSize = 10;
  public pageDisplay = 10;
  public filterKeyword = '';
  public filterCategoryID: number;
  public doituongList: any[];
  public doituong: any;
  doituongModel: FormGroup;
  nhomDoiTuongList: any;
  /*DoiTuong manage */
  public imageEntity: any = {};
  public doituongImages: any = [];
  @ViewChild('imagePath', { static: false }) imagePath;
  public sizeId: number = null;
  public colorId: number = null;
  public colors: any[];
  public sizes: any[];

  doituongColumn = DoiTuongJSON.DoiTuongForm.ColumnInfo;
  ID_DT: any;
  constructor(public _authenService: AuthenService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,) {
    this.initForm();
  }
  ngOnInit() {
    this.search();
    this.getListnhomDoiTuong();
  }

  initForm() {
    this.doituongModel = this.formBuilder.group({
      ID_DT: ['', Validators.required],
      ID_DT_ME: ['', Validators.required],
      MA_NHOM_DT: [''],
      MA_DT: ['', Validators.required],
      TEN_DT: ['', Validators.required],
      DIA_CHI: ['', Validators.required],
      MS_THUE: ['', Validators.required],
      TEL: ['', Validators.required],
      Email: ['', Validators.required],
      GHI_CHU: ['', Validators.required],
    });
  }
  public search() {
    this.dataService.get('/doituong/Paged?Pagesize='+ this.pageSize)
      .subscribe((response: any) => {
        this.doituongList = response.Data;
        if (!this.doituong) {
          this.doituong = response.Data[0]
        }
        this.pageNumber = response.pageNumber;
      }, error => this.dataService.handleError(error));
  }
  public reset() {
    this.filterKeyword = '';
    this.filterCategoryID = null;
    this.search();
  }
  // Show add form
  public showAdd() {
    this.entity = { Content: '' };
    this.addEditModal.show();
  }
  // Show edit form
  public showEdit(id: string) {
    this.dataService.get('/doituong/' + id).subscribe((response: any) => {
      this.doituong = response;
      this.ID_DT = id
    }, error => this.dataService.handleError(error));
  }

  public delete(id: string) {
    // this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
    //   this.dataService.delete('/doituong/delete', 'id', id).subscribe((response: any) => {
    //     this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
    //     this.search();
    //   }, error => this.dataService.handleError(error));
    // });
  }

  // Save change for modal popup
  public saveChanges(valid: boolean) {
    // if (valid) {
    //   const fi = this.thumbnailImage.nativeElement;
    //   if (fi.files.length > 0) {
    //     this.uploadService.postWithFile('/upload/saveImage?type=doituong', null, fi.files).then((imageUrl: string) => {
    //       this.entity.ThumbnailImage = imageUrl;
    //     }).then(() => {
    //       this.saveData();
    //     });
    //   } else {
    //     this.saveData();
    //   }
    // }
  }
  saveData() {
    let _doituong = [];
    _doituong.push(
      "@ID_DT", this.doituong.ID_DT,
      "@ID_DT_ME", this.doituong.ID_DT_ME,
      "@MA_DT", this.doituong.MA_DT,
      "@TEN_DT", this.doituong.TEN_DT,
      "@TEN_DT_TMP", this.doituong.TEN_DT_TMP,
      "@DIA_CHI", this.doituong.DIA_CHI,
      "@DIA_CHI_GD", this.doituong.DIA_CHI_GD,
      "@MS_THUE", this.doituong.MS_THUE,
      "@TEL", this.doituong.TEL,
      "@FAX", this.doituong.FAX,
      "@E_MAIL", this.doituong.E_MAIL,
      "@WEB_SITE", this.doituong.WEB_SITE,
      "@SO_TKNH", this.doituong.SO_TKNH,
      "@NGAN_HANG", this.doituong.NGAN_HANG,
      "@NGAY_SINH", this.doituong.NGAY_SINH,
      "@NOI_SINH", this.doituong.NOI_SINH,
      "@GCN_SO", this.doituong.GCN_SO,
      "@GCN_NGAY", this.doituong.GCN_NGAY,
      "@GCN_NGAYCAP", this.doituong.GCN_NGAYCAP,
      "@GCN_NOICAP", this.doituong.GCN_NOICAP,
      "@GHI_CHU", this.doituong.GHI_CHU,
      "@ID_TINH", this.doituong.ID_TINH,
      "@ID_QGIA", this.doituong.ID_QGIA,
      "@CA_NHAN", this.doituong.CA_NHAN,
      "@NHAN_VIEN", this.doituong.NHAN_VIEN,
      "@ISNCC", this.doituong.ISNCC,
      "@ISKH", this.doituong.ISKH,
      "@CHI_TIET", this.doituong.CHI_TIET,
      "@USER_ID", this.doituong.USER_ID,
      "@ID_BP", this.doituong.ID_BP,
      "@ID_YTP", this.doituong.ID_YTP,
      "@ID_DV", this.doituong.ID_DV,
      "@ID_NHOM_DT", this.doituong.ID_NHOM_DT,
      "@BIT_LOAI_DT", this.doituong.BIT_LOAI_DT,
      "@HAN_MUC_CN", this.doituong.HAN_MUC_CN,
      "@SO_NGAY_NO", this.doituong.SO_NGAY_NO,
      "@GID_DT", this.doituong.GID_DT,
      "@NGAY_SUA", this.doituong.NGAY_SUA,
    )


    if (this.ID_DT === undefined) {
      this.dataService.post('/doituong', _doituong).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      });
    } else {
      this.dataService.put('/doituong', _doituong).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => this.dataService.handleError(error));
    }
  }

  public pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.search();
  }


  onChangePageSize() {
    this.search();
  }

  getListnhomDoiTuong() {
    this.dataService.get('/NhomDoiTuong').subscribe((response: any) => {
      if (response) {
        this.nhomDoiTuongList = response;
      }
    });
  }

  onCreate(): void {
    this.doituong.push({ noQuestion: 0 });
  }
}
