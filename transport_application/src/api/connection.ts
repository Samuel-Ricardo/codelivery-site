import { GOOGLE_API_KEY } from "@/config";
import { useRef } from "react";
import { Socket, connect } from "socket.io-client";

const socket_client = useRef<Socket>();

export function getConnection() {

  if (socket_client.current?.connected) return socket_client 
  
  socket_client.current = connect(GOOGLE_API_KEY()) 
  socket_client.current.on("connect", () => console.log("Connected! :D"))

  return socket_client;
}
