import { FormControl, InputLabel, Select as MuiSelect } from "@mui/material";

export function Select({ label, ...rest }) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} {...rest} />
    </FormControl>
  );
}
