import { API_URL, EVENTS } from "@/config";
import { Console } from "console";
import { Socket, connect } from "socket.io-client";

const socket_client:Socket = connect(API_URL());


  socket_client.on('connect', () => console.log("Connected! :D"))

  socket_client.onAnyOutgoing((event, ...args) => console.log({event, args}))
  socket_client.onAny((event, ...args) => console.log({event, args}))

  socket_client.on('disconnect', (...args) => console.log("Client disconnected", {args}))


export const getConnection = () => {

  if (socket_client?.connected) return socket_client 

  socket_client.connect()
  socket_client.on("connect", (...args) =>{

    console.log("Connected! 2 :D", {args})

    socket_client.on('disconnect', (...args) => {
      console.log('Client disconnected. 2', {args});
    });
  })

  return socket_client; 
}
