import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book/book.service';
import { GoogleBooksApisGatewayService } from './book/google-books-apis-gateway.service';
import { BookCacheService } from './book/book-cache.service';
import { RestApiGateway } from './rest-api-gateway';
import { BookGateway } from './book/book-gateway';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BookService, GoogleBooksApisGatewayService, BookCacheService, UserService]
})
export class ServiceModule { }
