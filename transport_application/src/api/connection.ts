import { API_URL } from "@/config";
import { Socket, connect } from "socket.io-client";

var socket_client:Socket;

export const getConnection = () => {

  if (socket_client?.connected) return socket_client 

  socket_client = connect(API_URL()) 
  socket_client.on("connect", () => console.log("Connected! :D"))
  
  return socket_client; 
}
