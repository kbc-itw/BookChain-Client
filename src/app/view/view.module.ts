import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { ViewRoutingModule } from './view-routing.module';
import { ViewPartsModule } from './view-parts/view-parts.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from '../service/user.service';
import { UserDetailComponent } from './view-parts/user-detail/user-detail.component';
import { OwnershipListComponent } from './ownership-list/ownership-list.component';

import { TradeInviterComponent } from './trade-inviter/trade-inviter.component';
import { BookRegisterFileUploadComponent } from './book-register/book-register-file-upload/book-register-file-upload.component';
import { ServiceModule } from '../service/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeGuestComponent } from './trade-guest/trade-guest.component';
import { LoginComponent } from '../login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    ViewPartsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    material.MatButtonModule,
    material.MatExpansionModule,
    material.MatStepperModule,
    material.MatInputModule,
    material.MatTabsModule,
    material.MatProgressSpinnerModule
  ],
  declarations: [
    DashboardComponent, OverviewComponent, TradeInviterComponent,TradeGuestComponent, BookRegisterFileUploadComponent, LoginComponent,
    UserRegisterComponent,OwnershipListComponent,ProfileComponent
  ],
  exports: [OverviewComponent]
})
export class ViewModule { }
