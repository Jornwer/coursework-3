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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent, canActivate: [UnauthorizedGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UnauthorizedGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
