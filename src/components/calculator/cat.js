import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { BLACK, RED, TORTIE } from "../../consts/bases";
import { DILUTED, UNDILUTED, UNDILUTED_CARRIER } from "../../consts/dilutes";
import {
  CLASSIC,
  MACKEREL,
  NON_SPOTTED,
  NON_TICKED,
  SPOTTED,
  SPOTTED_CARRIER,
  TICKED,
  TICKED_CARRIER,
  UNKNOWN,
} from "../../consts/patterns";
import { SOLID, TABBY, TABBY_CARRIER } from "../../consts/tabby";
import { NON_SILVER, SILVER, SILVER_CARRIER } from "../../consts/silver";
import { NON_WHITE, WHITE, WHITE_CARRIER } from "../../consts/white";
import { Select } from "./select";

export function Cat({ female, state, set }) {
  const silverLabel = state.tabby === 0 ? "Silver" : "Smoke";

  return (
    <Box>
      <Typography paddingBottom={2} textAlign="center">
        {female ? "Female" : "Male"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Select label="Base" value={state?.base} onChange={set?.base}>
            <MenuItem value={BLACK}>Black</MenuItem>
            <MenuItem value={RED}>Red</MenuItem>
            {female && <MenuItem value={TORTIE}>Tortoiseshell</MenuItem>}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Dilute" value={state?.dilute} onChange={set?.dilute}>
            <MenuItem value={UNDILUTED}>Non-dilute</MenuItem>
            <MenuItem value={UNDILUTED_CARRIER}>Non-dilute, carrier</MenuItem>
            <MenuItem value={DILUTED}>Dilute</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Tabby" value={state?.tabby} onChange={set?.tabby}>
            <MenuItem value={SOLID}>Solid</MenuItem>
            <MenuItem value={TABBY_CARRIER}>Tabby, carrier</MenuItem>
            <MenuItem value={TABBY}>Tabby</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Tabby Pattern 1"
            value={state?.pattern1}
            onChange={set?.pattern1}
          >
            <MenuItem value={UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={CLASSIC}>Classic / Blotched</MenuItem>
            <MenuItem value={MACKEREL}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Tabby Pattern 2"
            value={state?.pattern2}
            onChange={set?.pattern2}
          >
            <MenuItem value={UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={CLASSIC}>Classic / Blotched</MenuItem>
            <MenuItem value={MACKEREL}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Spotted"
            value={state?.spotted}
            onChange={set?.spotted}
          >
            <MenuItem value={UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={NON_SPOTTED}>Non-spotted</MenuItem>
            <MenuItem value={SPOTTED_CARRIER}>Spotted, carrier</MenuItem>
            <MenuItem value={SPOTTED}>Spotted</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Ticked" value={state?.ticked} onChange={set?.ticked}>
            <MenuItem value={UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={NON_TICKED}>Non-ticked</MenuItem>
            <MenuItem value={TICKED_CARRIER}>Ticked, carrier</MenuItem>
            <MenuItem value={TICKED}>Ticked</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label={silverLabel}
            value={state?.silver}
            onChange={set?.silver}
          >
            <MenuItem value={NON_SILVER}>
              Non-{silverLabel.toLowerCase()}
            </MenuItem>
            <MenuItem value={SILVER_CARRIER}>{silverLabel}, carrier</MenuItem>
            <MenuItem value={SILVER}>{silverLabel}</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="White" value={state?.white} onChange={set?.white}>
            <MenuItem value={NON_WHITE}>No white</MenuItem>
            <MenuItem value={WHITE_CARRIER}>With white</MenuItem>
            <MenuItem value={WHITE}>White</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cat;
