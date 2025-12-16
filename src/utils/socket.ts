import { io } from "socket.io-client";
export const socket = io(
  import.meta.env.VITE_SOCKET_URL ||
    "https://lsmbackend-production.up.railway.app",
  {
    transports: ["websocket"],
    autoConnect: true,
  }
);
