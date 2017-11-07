import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewPartsModule } from './view-parts/view-parts.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    ViewPartsModule
  ],
  declarations: [DashboardComponent, OverviewComponent],
  exports: [OverviewComponent]
})
export class ViewModule { }
