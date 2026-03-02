import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { AuthenService } from 'src/app/core/services/authen.service';
import { MessageContstants } from 'src/app/core/common/message.constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  @ViewChild('avatar', { static: false }) avatar;
  public myRoles: string[] = [];
  public pageIndex = 1;
  public pageSize = 10;
  public pageDisplay = 10;
  public totalRow: number;
  public filter = '';
  public users: any[];
  public entity: any;
  // public baseFolder: string = environment.ROOT_PATH;
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private _uploadService: UploadService,
    public _authenService: AuthenService) {

    // if (_authenService.checkAccess('user') === false) {
    //   _utilityService.navigateToLogin();
    // }
  }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  loadData() {
    this._authenService.get('/accounts/Paged?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Data;
        this.pageIndex = response.PageNumber;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalItems;
      });
  }

  loadRoles() {
    this._authenService.get('/roles').subscribe((response: any[]) => {
      this.allRoles = [];
      for (const role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  loadUserDetail(id: any) {
    this._authenService.get('/accounts/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        this.myRoles = [];
        for (const role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY'); // .format('MM/DD/YYYY');
        // console.log(this.entity.BirthDay);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.entity.BirthDay = moment(new Date(Date.now())).format('DD/MM/YYYY');
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  deleteItemConfirm(id: any) {
    // this._dataService.delete('/appUser/delete', 'id', id).subscribe((response: Response) => {
    //   this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
    //   this.loadData();
    // });
  }

}
