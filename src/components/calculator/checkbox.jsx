import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

export function Checkbox({ label, ...rest }) {
  return (
    <FormControlLabel
      fullWidth
      label={label}
      control={<MuiCheckbox {...rest} />}
    />
  );
}
