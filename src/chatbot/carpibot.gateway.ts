import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CarpibotService } from './carpibot.service';

@WebSocketGateway({
  namespace: '/carpibot',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class CarpiChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly carpiBotService: CarpibotService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connect');
    client.emit('menu', this.carpiBotService.getMenu());
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnect');
  }

  @SubscribeMessage('chooseOption')
  handleOption(
    @MessageBody() optionId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const initialOptions = this.carpiBotService.getInitialOptions(optionId);
    client.emit('options', initialOptions);
  }

  @SubscribeMessage('response')
  handleResponse(
    @MessageBody() optionId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const response = this.carpiBotService.getResponse(optionId);
    client.emit('response', response);
  }
}
