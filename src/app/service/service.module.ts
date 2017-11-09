import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book/book.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BookService]
})
export class ServiceModule { }
