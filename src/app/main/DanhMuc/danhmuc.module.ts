import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { UtilityService } from 'src/app/core/services/utility.service';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { DataService } from 'src/app/core/services/data.service';
import { AuthenService } from 'src/app/core/services/authen.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { danhmucRouter } from './danhmuc.routes';
import { CommonpipeModule } from '../pipe/commonpipe.module';
import { DoiTuongComponent } from './DoiTuong/doituong.component';


@NgModule({
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    danhmucRouter,
    SharedModule,
    EditorModule,
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    CommonpipeModule

  ],
  declarations: [
    DoiTuongComponent
    // SimpleTinyComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    DataService, UtilityService, UploadService
  ]
})
export class danhmucModule {
}
