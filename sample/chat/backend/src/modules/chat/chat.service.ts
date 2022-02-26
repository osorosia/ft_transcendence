import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  public async getChatMessage() {
    console.log('get chat message');
  }
  public async sendMessage(message: any): Promise<any> {
    console.log('send chat message');
    return message;
  }
}
