import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

type ChatType = {
  userName: string;
  message: string;
  datetime: string;
};

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    // this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('msgToClient', 'connected');
  }

  @SubscribeMessage('message')
  public async handleMessage(_: Socket, payload: ChatType) {
    console.log('msgToClient', payload, _.id);
    this.server.emit('msgToClient', payload);
  }
}
