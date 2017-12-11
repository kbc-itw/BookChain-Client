import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { ViewRoutingModule } from './view-routing.module';
import { ViewPartsModule } from './view-parts/view-parts.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { BookRegisterFileUploadComponent } from './book-register/book-register-file-upload/book-register-file-upload.component';
import { ServiceModule } from '../service/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  declarations: [DashboardComponent, OverviewComponent, BookRegisterFileUploadComponent],
  exports: [OverviewComponent]
})
export class ViewModule { }
