import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './ormconfig';
import { MembersModule } from './members/members.module';
import { RentbooksModule } from './rentbooks/rentbooks.module'; 
import { ReturnbooksModule } from './returnbooks/returnbooks.module';

@Module({
  imports: [BooksModule, MembersModule, RentbooksModule, ReturnbooksModule, TypeOrmModule.forRoot(OrmConfig)],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
