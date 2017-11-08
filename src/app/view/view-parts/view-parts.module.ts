import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { NotImplementedDirective, NotImplementedDialogComponent } from './not-implemented/not-implemented.directive';

@NgModule({
  imports: [
    CommonModule,
    material.MatToolbarModule,
    material.MatDialogModule
  ],
  entryComponents: [NotImplementedDialogComponent],
  declarations: [HeaderComponent, NotImplementedDirective, NotImplementedDialogComponent],
  exports: [ HeaderComponent, NotImplementedDirective ]
})
export class ViewPartsModule { }
