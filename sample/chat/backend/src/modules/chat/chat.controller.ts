import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('get-messages')
  async getMessages(@Req() req: any, @Query() query: any) {
    console.log('get-message called');
  }

  @Post('send-message')
  async sendMessage(
    @Req() req: any,
    @Body() message: Partial<any>,
  ): Promise<any> {
    console.log('send message called');

    return await this.chatService.sendMessage(message);
  }
}
