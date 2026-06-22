import { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import useRoomMessages from "./useRoomMessages";

export default function RoomChat({
  roomId,
  disabled,
}: {
  roomId: string;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useRoomMessages(roomId);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    sendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor: "#34373b",
        borderRadius: 2,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              height: 150,
              overflowY: "auto",
              // color: "#fff",
            }}
          >
            {messages.map((roomMessage, index) => (
              <Typography key={`${roomMessage.senderId}-${index}`}>
                <b>{roomMessage.senderId.slice(0, 4).toLocaleUpperCase()}</b>:{" "}
                {roomMessage.message}
              </Typography>
            ))}
          </Paper>
        </Grid>

        <Grid size="grow">
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            fullWidth
            label="Chat"
            value={message}
            size="small"
            sx={{ color: "white" }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>

        <Grid size="auto">
          <Button disabled={disabled} variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
