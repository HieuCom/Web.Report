import { Component } from "@angular/core";
import { SystemConstants } from "src/app/core/common/system.constants";
import { UrlConstants } from "src/app/core/common/url.constants";
import { UtilityService } from "src/app/core/services/utility.service";

@Component({
  selector: "app-bubble-menu",
  templateUrl: "./bubble-menu.component.html",
  styleUrls: ["./bubble-menu.component.css"],
})
export class BubbleMenuComponent {
  constructor(private utilityService: UtilityService) {}
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  openSetting() {
    console.log("Cài đặt");
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  lockScreen() {
    console.log("Khóa màn hình");
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
}
