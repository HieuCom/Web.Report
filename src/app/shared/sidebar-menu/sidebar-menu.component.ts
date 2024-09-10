import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  permission = '';
  constructor(private authenService: AuthenService, private dataService: DataService) { }

  ngOnInit() {
   
  }
  public functions = [
    {
      "Name": "Báo Cáo Tiền Mặt", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Sổ quỹ tiền mặt", "Url": "inventory/soquytienmat"
        },
      ]
    },
    {
      "Name": "Báo Cáo Ngân Hàng", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Sổ quỹ ngân hàng", "Url": "inventory/sotienguinh"
        },
      ]
    },
    {
      "Name": "Báo cáo công nợ", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Sổ Chi Tiết Công Nợ", "Url": "inventory/sochitietcongno"
        },
      ]
    },
    {
      "Name": "Báo cáo bán hàng", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Báo Cáo Lãi Lỗ", "Url": "inventory/baocaolailo"
        },
        {
          "Name": "Bảng kê bán hàng", "Url": "inventory/bangkebanhang"
        },
      ]
    },
    {
      "Name": "Báo cáo hàng hoá", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Thẻ kho", "Url": "inventory/thekho"
        },
        {
          "Name": "Nhập xuất tồn", "Url": "inventory/nhapxuaton"
        },
        {
          "Name": "Sổ chi tiết kho", "Url": "inventory/sochitietkho"
        },
      ]
    },
    {
      "Name": "Báo cáo nhật ký chung", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Sổ chi tiết tài khoản", "Url": "inventory/sochitiettk"
        },
        {
          "Name": "Sổ nhật ký chung", "Url": "inventory/sonhatky"
        },
        {
          "Name": "Bảng kê chứng từ", "Url": "inventory/bangkechungtu"
        },
      ]
    },
    {
      "Name": "Báo cáo tài chính", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Bảng cân đối kế toán", "Url": "inventory/candoi"
        },
        {
          "Name": "Báo cáo hoạt động sản xuất kinh doanh", "Url": "inventory/hoatdong"
        },
        {
          "Name": "Báo cáo lưu chuyển tiền tệ", "Url": "inventory/luuchuyentt"
        },
      ]
    },
    {
      "Name": "Báo cáo thuế", "Url": "",
      "ChildFunctions": [
        {
          "Name": "Tờ khai thuế GTGT mua vào", "Url": "inventory/hoadonmuavao"
        },
        {
          "Name": "Tờ khai thuế GTGT bán ra", "Url": "inventory/hoadonbanra"
        },
        {
          "Name": "Tờ khai thuế GTGT", "Url": "inventory/tokhaithue"
        },
      ]
    }
  ];
  // toggleMenu(event: Event) {
  //   event.stopPropagation();
  //   (event.currentTarget as HTMLElement).nextElementSibling.classList.toggle('open');
  // }

  // toggleSubmenu(event: Event) {
  //   event.stopPropagation();
  //   (event.currentTarget as HTMLElement).nextElementSibling.classList.toggle('open');
  // }

  // toggleSubmenu(menuName: string) {
  //   this.submenus[menuName] = !this.submenus[menuName];
  // }

  // toggle(menuName: string) {
  //   this.submenus[menuName] = !this.submenus[menuName];
  //   if(this.submenus.showSubmenu == false){
  //     this.submenus.showSubmenu2 = !this.submenus.showSubmenu2;
  //     this.submenus.showSubmenuRpbank = false;
  //     this.submenus.showSubmenujournal = false;
  //   }

  // }

}
