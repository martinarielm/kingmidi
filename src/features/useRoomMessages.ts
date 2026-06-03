import { useEffect, useState } from "react";
import { socket } from "../services/socket";

type RoomMessage = {
  roomId: string;
  message: string;
  senderId: string;
};

export default function useRoomMessages(roomId: string) {
  const [messages, setMessages] = useState<RoomMessage[]>([]);

  useEffect(() => {
    const handleRoomMessage = (payload: RoomMessage) => {
      if (payload.roomId === roomId) {
        setMessages((currentMessages) => [...currentMessages, payload]);
      }
    };

    socket.on("room:message", handleRoomMessage);

    return () => {
      socket.off("room:message", handleRoomMessage);
    };
  }, [roomId]);

  const sendMessage = (message: string) => {
    socket.emit("room:message", {
      roomId,
      message,
    });
  };

  return { messages, sendMessage };
}
