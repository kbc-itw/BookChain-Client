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

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    ViewPartsModule,
    material.MatButtonModule,
    material.MatExpansionModule
  ],
  declarations: [DashboardComponent, OverviewComponent, ProfileComponent],
  exports: [OverviewComponent]
})
export class ViewModule { }
