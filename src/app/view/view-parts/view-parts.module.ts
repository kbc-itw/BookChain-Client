import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as material from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { NotImplementedDirective, NotImplementedDialogComponent } from './not-implemented/not-implemented.directive';
import { BookAboutComponent } from './book/book-about/book-about.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    material.MatToolbarModule,
    material.MatDialogModule
  ],
  entryComponents: [NotImplementedDialogComponent],
  declarations: [HeaderComponent, NotImplementedDirective, NotImplementedDialogComponent, BookAboutComponent, BookDetailComponent, UserDetailComponent],
  exports: [ HeaderComponent, NotImplementedDirective ]
})
export class ViewPartsModule { }
