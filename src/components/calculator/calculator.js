import { Button, Stack } from "@mui/material";
import { useState } from "react";
import {
  DILUTED,
  SOLID,
  TABBY,
  TABBY_CARRIER,
  UNDILUTED,
  UNDILUTED_CARRIER,
  UNKNOWN,
} from "../../consts";
import { BLACK, RED, TORTIE } from "../../consts/bases";
import { useCat } from "../../hooks";
import { Cat } from "./cat";

export function Calculator() {
  const [male, setMale] = useCat();
  const [female, setFemale] = useCat();
  const [phenos, setPhenos] = useState([]);

  const calculate = () => {
    const bases = calculateBases(male.base, female.base);
    const dilutes = calculateDilutes(male.dilute, female.dilute);
    const tabbys = calculateTabbys(male.tabby, female.tabby);
    const patterns = calculatePatterns(male, female);
    setPhenos(JSON.stringify({ bases, dilutes, tabbys }));
  };

  return (
    <Stack alignItems="center">
      <Stack direction="row" spacing={4} padding={2}>
        <Cat state={male} set={setMale} />
        <Cat state={female} set={setFemale} female />
      </Stack>

      <Button onClick={calculate}>Calculate</Button>

      {phenos.length > 0 && <Stack>{phenos}</Stack>}
    </Stack>
  );
}

const calculateBases = (male, female) => {
  const bases = { male: [], female: [] };
  switch (true) {
    case male === BLACK && female === BLACK:
      bases.male = [BLACK];
      bases.female = [BLACK];
      break;
    case male === BLACK && female === RED:
      bases.male = [RED];
      bases.female = [TORTIE];
      break;
    case male === BLACK && female === TORTIE:
      bases.male = [BLACK, RED];
      bases.female = [BLACK, TORTIE];
      break;
    case male === RED && female === BLACK:
      bases.male = [BLACK];
      bases.female = [TORTIE];
      break;
    case male === RED && female === RED:
      bases.male = [RED];
      bases.female = [RED];
      break;
    case male === RED && female === TORTIE:
      bases.male = [BLACK, RED];
      bases.female = [RED, TORTIE];
      break;
  }
  return bases;
};

const calculateDilutes = (male, female) => {
  const dilutes = [];
  switch (true) {
    case male === UNDILUTED && female === UNDILUTED:
      dilutes.push(UNDILUTED);
      break;
    case male === UNDILUTED && female === UNDILUTED_CARRIER:
    case male === UNDILUTED_CARRIER && female === UNDILUTED:
      dilutes.push(UNDILUTED, UNDILUTED_CARRIER);
      break;
    case male === UNDILUTED && female === DILUTED:
    case male === DILUTED && female === UNDILUTED:
      dilutes.push(UNDILUTED_CARRIER);
      break;
    case male === UNDILUTED_CARRIER && female === UNDILUTED_CARRIER:
      dilutes.push(UNDILUTED, UNDILUTED_CARRIER, DILUTED);
      break;
    case male === UNDILUTED_CARRIER && female === DILUTED:
    case male === DILUTED && female === UNDILUTED_CARRIER:
      dilutes.push(UNDILUTED_CARRIER, DILUTED);
      break;
    case male === DILUTED && female === DILUTED:
      dilutes.push(DILUTED);
      break;
  }
  return dilutes;
};

const calculateTabbys = (male, female) => {
  const tabbys = [];
  switch (true) {
    case male === SOLID && female === SOLID:
      tabbys.push(SOLID);
      break;
    case male === SOLID && female === TABBY_CARRIER:
    case male === TABBY_CARRIER && female === SOLID:
      tabbys.push(SOLID, TABBY_CARRIER);
      break;
    case male === SOLID && female === TABBY:
    case male === TABBY && female === SOLID:
      tabbys.push(TABBY_CARRIER);
      break;
    case male === TABBY_CARRIER && female === TABBY_CARRIER:
      tabbys.push(SOLID, TABBY_CARRIER, TABBY);
      break;
    case male === TABBY_CARRIER && female === TABBY:
    case male === TABBY && female === TABBY_CARRIER:
      tabbys.push(TABBY_CARRIER, TABBY);
      break;
    case male === TABBY && female === TABBY:
      tabbys.push(TABBY);
      break;
  }
  return tabbys;
};

const calculatePatterns = (male, female) => {
  const patterns = [];
  switch (true) {
  }
  return patterns;
};

export default Calculator;
