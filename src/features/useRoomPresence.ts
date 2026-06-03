import { useEffect, useState } from "react";
import { socket } from "../services/socket";

type RoomUsersPayload = {
  roomId: string;
  users: number;
};

type UseRoomPresenceParams = {
  roomId?: string;
  isSocketConnected: boolean;
};

export default function useRoomPresence({
  roomId,
  isSocketConnected,
}: UseRoomPresenceParams) {
  const [roomUsersPayload, setRoomUsersPayload] = useState<RoomUsersPayload>();

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

  return { roomUsers };
}
