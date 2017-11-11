import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book/book.service';
import { GoogleBooksApisGatewayService } from './book/google-books-apis-gateway.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BookService, GoogleBooksApisGatewayService]
})
export class ServiceModule { }
