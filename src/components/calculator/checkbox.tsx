import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <FormControlLabel
      // fullWidth
      label={label}
      control={<MuiCheckbox {...rest} />}
    />
  );
}

export default Checkbox;
