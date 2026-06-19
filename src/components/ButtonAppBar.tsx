import { cloneElement } from "react";
import { useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface Props {
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar sx={{ backgroundColor: "#282828" }}>
          <Toolbar>
            <Typography
              variant="h6"
              color="primary"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
              }}
            >
              King MIDI
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
