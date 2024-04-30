import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  SelectProps,
} from "@mui/material";

export function Select({ label, ...rest }: SelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} {...rest} />
    </FormControl>
  );
}

export default Select;
