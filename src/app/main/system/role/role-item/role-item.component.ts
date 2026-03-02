import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-role-item',
  templateUrl: './role-item.component.html',
  styleUrls: ['./role-item.component.css']
})
export class RoleItemComponent implements OnInit {

  @ViewChild('modalAddEdit', {static: false}) public modalAddEdit: ModalDirective;
  public entity: any;

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/appRole/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            // this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/appRole/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            // this.loadData();
            this.modalAddEdit.hide();
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

}
