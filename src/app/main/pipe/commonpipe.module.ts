import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DatetimePipeEvent, JsonToArrayPipe, PriorityPipe, StatusPipe,SubctiptionTypePiPe } from './common.pipe';


@NgModule({
  declarations: [
    StatusPipe,
    PriorityPipe,
    DatetimePipeEvent,
    JsonToArrayPipe,
    SubctiptionTypePiPe,
  ],
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EditorModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot()
  
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  exports:[
    StatusPipe,
    PriorityPipe,
    DatetimePipeEvent,
    JsonToArrayPipe,
    SubctiptionTypePiPe
  ]    
})
export class CommonpipeModule { 
}
