import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewPartsModule } from './view-parts/view-parts.module';

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    ViewPartsModule
  ],
  declarations: [DashboardComponent]
})
export class ViewModule { }
