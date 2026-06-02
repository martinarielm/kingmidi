import { useEffect, useState } from "react";
import { socket } from "../services/socket";

type RoomUsersPayload = {
  roomId: string;
  users: number;
};

export default function useSocketConnection(roomId?: string) {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [roomUsersPayload, setRoomUsersPayload] = useState<RoomUsersPayload>();

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

  useEffect(() => {
    if (!roomId || !isSocketConnected) return;

    const handleRoomUsers = (payload: RoomUsersPayload) => {
      if (payload.roomId === roomId) {
        setRoomUsersPayload(payload);
      }
    };

    socket.on("room:users", handleRoomUsers);
    socket.emit("room:join", { roomId });

    return () => {
      socket.off("room:users", handleRoomUsers);
      socket.emit("room:leave", { roomId });
    };
  }, [roomId, isSocketConnected]);

  const roomUsers =
    isSocketConnected && roomUsersPayload && roomUsersPayload.roomId === roomId
      ? roomUsersPayload.users
      : 0;

  return { isSocketConnected, roomUsers };
}
