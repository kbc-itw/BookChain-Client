import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { ViewRoutingModule } from './view-routing.module';
import { ViewPartsModule } from './view-parts/view-parts.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    ViewPartsModule,
    material.MatButtonModule,
    material.MatExpansionModule
  ],
  declarations: [DashboardComponent, OverviewComponent],
  exports: [OverviewComponent]
})
export class ViewModule { }
