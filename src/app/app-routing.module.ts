import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './profile/user-profile/user-profile.component';
import {SettingsComponent} from './profile/settings/settings.component';
import {AuthGuard} from './auth/auth.guard';
import {UnauthorizedGuard} from './auth/unauthorized.guard';
import {CompaniesComponent} from './companies/companies.component';
import {CreateOrganizationComponent} from './create-organization/create-organization.component';
import {AdminGuard} from './auth/admin.guard';
import {CompanyEditComponent} from './companies/company/company-edit/company-edit.component';
import {UsersPanelComponent} from './admin/users-panel/users-panel.component';
import {EditUserComponent} from './admin/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent, canActivate: [UnauthorizedGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UnauthorizedGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'create-company', component: CreateOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'company/edit/:id', component: CompanyEditComponent, canActivate: [AdminGuard]},
  {path: 'users', component: UsersPanelComponent, canActivate: [AdminGuard]},
  {path: 'users/:id', component: EditUserComponent, canActivate: [AdminGuard]},

  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
