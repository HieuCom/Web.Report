import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-function-item',
  templateUrl: './function-item.component.html',
  styleUrls: ['./function-item.component.css']
})
export class FunctionItemComponent implements OnInit {

  @ViewChild('addEditModal', { static: false }) public addEditModal: ModalDirective;
  public editFlag: boolean = false;
  public entity: any;  
  public _functions: any[];
  
  constructor(private _dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('/function/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          // this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          // this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }

}
