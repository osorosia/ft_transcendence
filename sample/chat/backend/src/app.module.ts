import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
