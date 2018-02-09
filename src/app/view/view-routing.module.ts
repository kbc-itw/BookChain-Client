import { UserRegisterComponent } from './user-register/user-register.component';
import { BookRegisterFileUploadComponent } from './book-register/book-register-file-upload/book-register-file-upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from '../login/login.component';
import { TradeInviterComponent } from './trade-inviter/trade-inviter.component';
import { TradeGuestComponent } from './trade-guest/trade-guest.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: BookRegisterFileUploadComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'user/register',
    component: UserRegisterComponent
  },
  {
    path: 'trade/inviter',
    component: TradeInviterComponent
  },
  {
    path: 'trade/guest',
    component: TradeGuestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
