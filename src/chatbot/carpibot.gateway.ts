import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({namespace: '/carpiChat'})
    export class CarpiChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
        @WebSocketServer()
        server: Server;
        
       

        // @SubscribeMessage('start')
        handleConnection(@ConnectedSocket() client: Socket) {
            console.log('Client connect');
        }


        handleDisconnect(@ConnectedSocket() client: Socket) {
            console.log('Client disconnect');
        }

        // @SubscribeMessage('chooseOption')
        // handleOption(@MessageBody() optionId: number, @ConnectedSocket() client: Socket){
        //     const response = this.getResponseByOption(optionId);
        //     client.emit('response', response)
        // }

    }    
   

