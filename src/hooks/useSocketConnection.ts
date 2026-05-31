import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export default function useSocketConnection() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      setIsSocketConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return { isSocketConnected };
}
