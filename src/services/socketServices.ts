import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

class SocketService {
  public io: SocketIOServer;

  constructor(server: http.Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: 'http://localhost:8080', // Remplacez par l'URL de votre client Vue.js
        methods: ['GET', 'POST', 'PUT'],
        credentials: true
      }
    });
  }

  public getIO(): SocketIOServer {
    return this.io;
  }
}

export default SocketService;
