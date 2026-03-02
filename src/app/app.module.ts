import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UtilityService } from './core/services/utility.service';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormErrors } from './core/helpers/form.errors';
import { DatePipe } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { UploadService } from './core/services/upload.service';
import { ThemeTogglerService } from './core/services/theme.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    HttpModule,
    // RouterModule.forRoot(appRoutes, { useHash: true }),
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderOrganization,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    EditorModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,    
    TypeaheadModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    UtilityService,    
    FormErrors,
    DatePipe,
    UploadService,
    ThemeTogglerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderOrganization(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
