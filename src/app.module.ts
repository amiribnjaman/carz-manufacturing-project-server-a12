import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCtroller } from './user/user.contoller';
import { userModule } from './user/user.module';

@Module({
  imports: [userModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
