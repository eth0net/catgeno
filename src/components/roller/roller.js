import { Stack } from "@mui/material";
import { Cat } from "./cat";
import { useCat } from "../../hooks";

export function Roller() {
  const [female, setFemale] = useCat();
  const [male, setMale] = useCat();

  return (
    <Stack direction="row" spacing={1} padding={1}>
      <Cat label="Female" state={female} set={setFemale} />
      <Cat label="Male" state={male} set={setMale} />
    </Stack>
  );
}

export default Roller;
