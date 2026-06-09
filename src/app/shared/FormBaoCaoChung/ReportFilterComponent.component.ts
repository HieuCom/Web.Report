import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-ReportFilterComponent",
  templateUrl: "./ReportFilterComponent.component.html",
  styleUrls: ["./ReportFilterComponent.component.css"],
})
export class ReportFilterComponent {
  @Input() fields: any[] = [];

  @Output() search = new EventEmitter<any>();
  @Output() lookup = new EventEmitter<any>();

  formData: any = {};

  onSearch() {
    this.search.emit(this.formData);
  }

  onLookup(field: any) {
    this.lookup.emit(field);
  }
}
