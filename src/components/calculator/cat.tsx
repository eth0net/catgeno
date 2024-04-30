import { Box, Grid, MenuItem, Typography } from "@mui/material";
import Base from "../../consts/base";
import Select from "./select";
import Dilute from "../../consts/dilute";
import Agouti from "../../consts/agouti";
import { Pattern, Spotted, Ticked } from "../../consts/pattern";
import Silver from "../../consts/silver";
import White from "../../consts/white";
import Eyes from "../../consts/eyes";
import { useCatProps, useCatSet } from "../../hooks/useCat/useCat";

interface CatProps {
  female?: boolean;
  state: useCatProps;
  set: useCatSet;
}

export function Cat({ female, state, set }: CatProps) {
  const silverLabel = state.agouti === 0 ? "Smoke" : "Silver";

  return (
    <Box>
      <Typography paddingBottom={2} textAlign="center">
        {female ? "Female" : "Male"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Select label="Base" value={state?.base} onChange={set?.base}>
            <MenuItem value={Base.BLACK}>Black</MenuItem>
            <MenuItem value={Base.RED}>Red</MenuItem>
            {female && <MenuItem value={Base.TORTIE}>Tortoiseshell</MenuItem>}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Dilute" value={state?.dilute} onChange={set?.dilute}>
            <MenuItem value={Dilute.NON_DILUTED}>Non-dilute</MenuItem>
            <MenuItem value={Dilute.HET_DILUTED}>Non-dilute, carrier</MenuItem>
            <MenuItem value={Dilute.DILUTED}>Dilute</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Tabby" value={state?.agouti} onChange={set?.agouti}>
            <MenuItem value={Agouti.SOLID}>Solid</MenuItem>
            <MenuItem value={Agouti.HET_TABBY}>Tabby, het</MenuItem>
            <MenuItem value={Agouti.TABBY}>Tabby</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Tabby Pattern 1"
            value={state?.pattern1}
            onChange={set?.pattern1}
          >
            <MenuItem value={Pattern.UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={Pattern.CLASSIC}>Classic / Blotched</MenuItem>
            <MenuItem value={Pattern.MACKEREL}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Tabby Pattern 2"
            value={state?.pattern2}
            onChange={set?.pattern2}
          >
            <MenuItem value={Pattern.UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={Pattern.CLASSIC}>Classic / Blotched</MenuItem>
            <MenuItem value={Pattern.MACKEREL}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label="Spotted"
            value={state?.spotted}
            onChange={set?.spotted}
          >
            <MenuItem value={Spotted.UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={Spotted.NON_SPOTTED}>Non-spotted</MenuItem>
            <MenuItem value={Spotted.HET_SPOTTED}>Spotted, het</MenuItem>
            <MenuItem value={Spotted.SPOTTED}>Spotted</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Ticked" value={state?.ticked} onChange={set?.ticked}>
            <MenuItem value={Ticked.UNKNOWN}>Unknown</MenuItem>
            <MenuItem value={Ticked.NON_TICKED}>Non-ticked</MenuItem>
            <MenuItem value={Ticked.HET_TICKED}>Ticked, het</MenuItem>
            <MenuItem value={Ticked.TICKED}>Ticked</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            label={silverLabel}
            value={state?.silver}
            onChange={set?.silver}
          >
            <MenuItem value={Silver.NON_SILVER}>
              Non-{silverLabel.toLowerCase()}
            </MenuItem>
            <MenuItem value={Silver.HET_SILVER}>{silverLabel}, het</MenuItem>
            <MenuItem value={Silver.SILVER}>{silverLabel}</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="White" value={state?.white} onChange={set?.white}>
            <MenuItem value={White.NON_WHITE}>No white</MenuItem>
            <MenuItem value={White.HET_SPOT_WHITE}>With White</MenuItem>
            <MenuItem value={White.HET_DOM_WHITE}>White</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select label="Eyes" value={state?.eyes} onChange={set?.eyes}>
            <MenuItem value={Eyes.NON_BLUE}>Non-blue</MenuItem>
            <MenuItem value={Eyes.HET_BLUE}>Blue, het</MenuItem>
            <MenuItem value={Eyes.BLUE}>Blue</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cat;
