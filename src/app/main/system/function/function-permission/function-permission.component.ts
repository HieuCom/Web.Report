import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-function-permission',
  templateUrl: './function-permission.component.html',
  styleUrls: ['./function-permission.component.css']
})
export class FunctionPermissionComponent implements OnInit {

  @ViewChild('permissionModal', { static: false }) public permissionModal: ModalDirective;
  public functionId: string;
  public _permission: any[];
  constructor(private _dataService: DataService,
    private notificationService: NotificationService,) { }

  ngOnInit(): void {
  }

  public savePermission(valid: boolean, _permission: any[]) {
    if (valid) {
      var data = {
        Permissions: this._permission,
        FunctionId: this.functionId
      }
      this._dataService.post('/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(response);
        this.permissionModal.hide();
      }, error => this._dataService.handleError(error));
    }
  }

}
