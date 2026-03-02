import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {

  title:string;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: BsModalService,
    public modalRefConfirm: BsModalRef) {}
 
  ngOnInit(): void {
  }
 
  confirm(): void {
    this.triggerEvent(true)
    this.modalRefConfirm.hide();
  }
 
  decline(): void {
    this.triggerEvent(false)
    this.modalRefConfirm.hide();
  }

  triggerEvent(item: boolean) {
    this.event.emit(item);
  }
}
