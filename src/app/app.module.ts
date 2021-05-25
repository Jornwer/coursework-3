import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSidebarModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule, NbToggleModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from './token-interceptor';
import { SettingsComponent } from './profile/settings/settings.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { CreateOrganizationComponent } from './companies/create-organization/create-organization.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UsersPanelComponent } from './admin/users-panel/users-panel.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { DecisionsComponent } from './decision/decisions/decisions.component';
import { DecisionCreateComponent } from './decision/decision-create/decision-create.component';
import { DecisionDisplayComponent } from './decision/decision-display/decision-display.component';
import {ChartsModule} from 'angular-bootstrap-md';
import { DecisionEditComponent } from './decision/decision-edit/decision-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    HomeComponent,
    SettingsComponent,
    CompaniesComponent,
    CompanyComponent,
    CreateOrganizationComponent,
    CompanyEditComponent,
    UsersPanelComponent,
    EditUserComponent,
    DecisionsComponent,
    DecisionCreateComponent,
    DecisionDisplayComponent,
    DecisionEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbCardModule,
        NbButtonModule,
        NbSidebarModule.forRoot(),
        NbInputModule,
        NbIconModule,
        NbFormFieldModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ChartsModule,
        NbToggleModule,
        FormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
