import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccountsModule } from './moduls/user-accounts/user-accounts.module';
import { TestingModule } from './moduls/testing/testing.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/',
      //'mongodb+srv://miha:miha2016!@cluster0.expiegq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UserAccountsModule,
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
