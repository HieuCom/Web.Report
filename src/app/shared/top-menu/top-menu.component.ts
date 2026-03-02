import { Component, OnInit, NgZone } from '@angular/core';
import { LoggedInUser } from '../../core/domain/loggedin.user';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { UrlConstants } from '../../core/common/url.constants';

import { SignalrService } from '../../core/services/signalr.service';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user: LoggedInUser;
  // public baseFolder: string = environment.ROOT_PATH;
  public canSendMessage: Boolean;
  public notifications: any[];
  numberNotificationNew: number;
  userLoginId: number;
  constructor(private _authenService: AuthenService,
    private utilityService: UtilityService,
    private _signalRService: SignalrService,
    private _dataService: DataService,
    private _ngZone: NgZone) {
    // this can subscribe for events 
    this.subscribeToEvents();
    // this can check for conenction exist or not. 
    this.canSendMessage = _signalRService.connectionExists;
  }

  ngOnInit() {
    this.user = this._authenService.getLoggedInUser();
    this.loadNotifications();
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }

  async getUserIdLogin() {
    // if (this.user.username) {
    //   let data = [];
    //   data.push("@UserName", this.user.username);
    //   let params = { "CommandText": "uspUser___FindUserName", "CommandType": 1025, "Parameters": data }
    //   await this._dataService.post('/commands', params).toPromise().then((response: any) => {
    //     if (response.Data) {
    //       this.userLoginId = response.Data[0].Id;
    //     }
    //   });
    // }
  }
  private subscribeToEvents(): void {

    let self = this;
    self.notifications = [];

    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from s
    // erver event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        console.log(announcement);
        moment.locale('vi');
        announcement.CreatedDate = moment(announcement.CreatedDate).fromNow();
        self.notifications.push(announcement);
      });
    });
  }

  markAsRead(id: number) {
    let data = [];
    data.push("@TaskNotificationId", id);
    let params = { "CommandText": "uspTaskEventNotification___MarkIsRead", "CommandType": 1025, "Parameters": data }
    this._dataService.post('/commands', params).subscribe((response: any) => {
      if (response) {
        this.loadNotifications();
      }
    })
  }

  async loadNotifications() {
    // await this.getUserIdLogin();
    // let data = [];
    // data.push("@SubscriberId", this.userLoginId);
    // let params = { "CommandText": "uspTaskEventNotification___GetBySubscriber", "CommandType": 1025, "Parameters": data }
    // this._dataService.post('/commands', params).subscribe((response: any) => {
    //   this.notifications = [];
    //   moment.locale('vi');
    //   for (let item of response.Data) {
    //     item.CreatedDate = moment(item.CreatedDate).fromNow();
    //     this.notifications.push(item);
    //   }
    //   this.numberNotificationNew = this.notifications.filter(p=>!p.IsRead).length;
    // });

  }

}
