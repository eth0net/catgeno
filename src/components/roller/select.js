import { FormControl, InputLabel, Select as MuiSelect } from "@mui/material";

export function Select({ label, value, onChange, children }) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={value}
        onChange={onChange}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
}
