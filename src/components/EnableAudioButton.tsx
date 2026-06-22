import { ButtonBase } from "@mui/material";

type EnableAudioButtonProps = {
  isAudioEnabled: boolean;
  onToggle: () => void;
};

function EnableAudioButton({
  isAudioEnabled,
  onToggle,
}: EnableAudioButtonProps) {
  return (
    <ButtonBase
      aria-label="Enable Audio"
      aria-pressed={isAudioEnabled}
      onClick={onToggle}
      sx={{
        alignItems: "center",
        background: isAudioEnabled
          ? "linear-gradient(145deg, #4a4d51, #27292c)"
          : "linear-gradient(145deg, #585c61, #2a2d31)",
        border: "2px solid #0b0b0b",
        borderRadius: "50%",
        boxShadow: isAudioEnabled
          ? "0 0 8px rgba(174, 139, 255, 0.65), 0 0 12px rgba(192, 165, 255, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.03), inset 0 -8px 14px rgba(0, 0, 0, 0.55)"
          : "inset 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 -6px 12px rgba(0, 0, 0, 0.42)",
        display: "inline-flex",
        height: 25,
        justifyContent: "center",
        transition: "box-shadow 180ms ease, background 180ms ease",
        width: 25,
        "&:hover": {
          boxShadow: isAudioEnabled
            ? "0 0 12px rgba(192, 165, 255, 0.38), 0 0 20px rgba(192, 165, 255, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.03), inset 0 -8px 14px rgba(0, 0, 0, 0.55)"
            : "inset 0 1px 1px rgba(255, 255, 255, 0.08), inset 0 -6px 12px rgba(0, 0, 0, 0.42)",
        },
      }}
    />
  );
}

export default EnableAudioButton;
