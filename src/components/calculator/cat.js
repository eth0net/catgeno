import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { BLACK, RED, TORTIE } from "../../consts/bases";
import { DILUTED, HET_DILUTED, NON_DILUTED } from "../../consts/dilutes";
import {
  CLASSIC,
  HET_SPOTTED,
  HET_TICKED,
  MACKEREL,
  NON_SPOTTED,
  NON_TICKED,
  SPOTTED,
  TICKED,
  UNKNOWN,
} from "../../consts/patterns";
import { HET_SILVER, NON_SILVER, SILVER } from "../../consts/silver";
import { HET_TABBY, SOLID, TABBY } from "../../consts/tabby";
import { HET_WHITE, NON_WHITE, WHITE } from "../../consts/white";
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
            <MenuItem value={NON_DILUTED}>Non-dilute</MenuItem>
            <MenuItem value={HET_DILUTED}>Non-dilute, carrier</MenuItem>
            <MenuItem value={DILUTED}>Dilute</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Tabby" value={state?.tabby} onChange={set?.tabby}>
            <MenuItem value={SOLID}>Solid</MenuItem>
            <MenuItem value={HET_TABBY}>Tabby, het</MenuItem>
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
            <MenuItem value={HET_SPOTTED}>Spotted, het</MenuItem>
            <MenuItem value={SPOTTED}>Spotted</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Ticked" value={state?.ticked} onChange={set?.ticked}>
            <MenuItem value={UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={NON_TICKED}>Non-ticked</MenuItem>
            <MenuItem value={HET_TICKED}>Ticked, het</MenuItem>
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
            <MenuItem value={HET_SILVER}>{silverLabel}, het</MenuItem>
            <MenuItem value={SILVER}>{silverLabel}</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="White" value={state?.white} onChange={set?.white}>
            <MenuItem value={NON_WHITE}>No white</MenuItem>
            <MenuItem value={HET_WHITE}>With white</MenuItem>
            <MenuItem value={WHITE}>White</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cat;
