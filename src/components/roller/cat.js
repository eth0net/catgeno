import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Select } from "./select";

export function Cat({ label, state, set }) {
  return (
    <Box>
      <Typography paddingBottom={1} textAlign="center">{label}</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Select label="Base" value={state?.base} onChange={set?.base}>
            <MenuItem value={0}>Black</MenuItem>
            <MenuItem value={1}>Red</MenuItem>
            <MenuItem value={2}>Tortoiseshell</MenuItem>
            <MenuItem value={3}>Blue</MenuItem>
            <MenuItem value={4}>Creme</MenuItem>
            <MenuItem value={5}>Blue Tortoiseshell</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Tabby" value={state?.tabby} onChange={set?.tabby}>
            <MenuItem value={0}>Solid</MenuItem>
            <MenuItem value={1}>Tabby, carries solid</MenuItem>
            <MenuItem value={2}>Tabby</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Tabby Pattern 1" value={state?.pattern1} onChange={set?.pattern1}>
            <MenuItem value={0}>Unknown</MenuItem>
            <MenuItem value={1}>Classic</MenuItem>
            <MenuItem value={2}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Tabby Pattern 2" value={state?.pattern2} onChange={set?.pattern2}>
            <MenuItem value={0}>Unknown</MenuItem>
            <MenuItem value={1}>Classic</MenuItem>
            <MenuItem value={2}>Mackerel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Spotted" value={state?.spotted} onChange={set?.spotted}>
            <MenuItem value={0}>Unknown</MenuItem>
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>One copy</MenuItem>
            <MenuItem value={3}>Two copies</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Ticked" value={state?.ticked} onChange={set?.ticked}>
            <MenuItem value={0}>Unknown</MenuItem>
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>One copy</MenuItem>
            <MenuItem value={3}>Two copies</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="Silver" value={state?.silver} onChange={set?.silver}>
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes, carries</MenuItem>
            <MenuItem value={2}>Yes, shows</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select label="White" value={state?.white} onChange={set?.white}>
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Yes, carries</MenuItem>
            <MenuItem value={2}>Yes, shows</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cat;