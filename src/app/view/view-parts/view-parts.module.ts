import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    material.MatToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [ HeaderComponent ]
})
export class ViewPartsModule { }
