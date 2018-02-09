import { OwnershipService } from './ownership/ownership.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book/book.service';
import { GoogleBooksApisGatewayService } from './book/google-books-apis-gateway.service';
import { BookCacheService } from './book/book-cache.service';
import { RestApiGateway } from './rest-api-gateway';
import { BookGateway } from './book/book-gateway';
import { UserService } from './user.service';
import { OwnershipGatewayService } from './ownership-gateway.service';
import { OwnershipService } from './ownership.service';
import { TradingService } from './trading/trading.service';
import { RoomService } from './room/room.service';
import { UserRegisterService } from './user/user-register.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BookService, GoogleBooksApisGatewayService, BookCacheService, UserService,
  TradingService, OwnershipGatewayService, OwnershipService, RoomService, UserRegisterService, UserRegisterService]
})
export class ServiceModule { }
