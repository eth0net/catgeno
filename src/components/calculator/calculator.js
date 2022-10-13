import { Button, Stack } from "@mui/material";
import { useState } from "react";
import {
  HET_SPOTTED,
  SPOTTED,
  UNKNOWN,
  TICKED,
  HET_TICKED,
  NON_TICKED,
  NON_SPOTTED,
} from "../../consts/pattern";
import { BLACK, RED, TORTIE } from "../../consts/base";
import { DILUTED, HET_DILUTED, NON_DILUTED } from "../../consts/dilute";
import { SILVER, HET_SILVER, NON_SILVER } from "../../consts/silver";
import { HET_TABBY, SOLID, TABBY } from "../../consts/tabby";
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
    const patterns = calculatePatterns(
      male.pattern1,
      male.pattern2,
      female.pattern1,
      female.pattern2
    );
    const spotted = calculateSpotted(male.spotted, female.spotted);
    const ticked = calculateTicked(male.ticked, female.ticked);
    setPhenos(
      JSON.stringify({ bases, dilutes, tabbys, patterns, spotted, ticked })
    );
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
    case male === NON_DILUTED && female === NON_DILUTED:
      dilutes.push(NON_DILUTED);
      break;
    case male === NON_DILUTED && female === HET_DILUTED:
    case male === HET_DILUTED && female === NON_DILUTED:
      dilutes.push(NON_DILUTED, HET_DILUTED);
      break;
    case male === NON_DILUTED && female === DILUTED:
    case male === DILUTED && female === NON_DILUTED:
      dilutes.push(HET_DILUTED);
      break;
    case male === HET_DILUTED && female === HET_DILUTED:
      dilutes.push(NON_DILUTED, HET_DILUTED, DILUTED);
      break;
    case male === HET_DILUTED && female === DILUTED:
    case male === DILUTED && female === HET_DILUTED:
      dilutes.push(HET_DILUTED, DILUTED);
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
    case male === SOLID && female === HET_TABBY:
    case male === HET_TABBY && female === SOLID:
      tabbys.push(SOLID, HET_TABBY);
      break;
    case male === SOLID && female === TABBY:
    case male === TABBY && female === SOLID:
      tabbys.push(HET_TABBY);
      break;
    case male === HET_TABBY && female === HET_TABBY:
      tabbys.push(SOLID, HET_TABBY, TABBY);
      break;
    case male === HET_TABBY && female === TABBY:
    case male === TABBY && female === HET_TABBY:
      tabbys.push(HET_TABBY, TABBY);
      break;
    case male === TABBY && female === TABBY:
      tabbys.push(TABBY);
      break;
  }
  return tabbys;
};

const calculatePatterns = (male1, male2, female1, female2) => {
  let patterns = [
    [male1, female1].sort(sortDesc),
    [male1, female2].sort(sortDesc),
    [male2, female1].sort(sortDesc),
    [male2, female2].sort(sortDesc),
  ];
  return patterns.sort(([a0, a1], [b0, b1]) => a0 + a1 - (b0 + b1));
};

const calculateSpotted = (male, female) => {
  const spotted = [];
  switch (true) {
    case male === UNKNOWN && female === UNKNOWN:
      spotted.push(UNKNOWN);
      break;
    case male === UNKNOWN && female === NON_SPOTTED:
    case male === NON_SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, NON_SPOTTED);
      break;
    case male === UNKNOWN && female === HET_SPOTTED:
    case male === HET_SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, HET_SPOTTED);
      break;
    case male === UNKNOWN && female === SPOTTED:
    case male === SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, SPOTTED);
      break;
    case male === NON_SPOTTED && female === NON_SPOTTED:
      spotted.push(NON_SPOTTED);
      break;
    case male === NON_SPOTTED && female === HET_SPOTTED:
    case male === HET_SPOTTED && female === NON_SPOTTED:
      spotted.push(NON_SPOTTED, HET_SPOTTED);
      break;
    case male === NON_SPOTTED && female === SPOTTED:
    case male === SPOTTED && female === NON_SPOTTED:
      spotted.push(HET_SPOTTED);
      break;
    case male === HET_SPOTTED && female === HET_SPOTTED:
      spotted.push(NON_SPOTTED, HET_SPOTTED, SPOTTED);
      break;
    case male === HET_SPOTTED && female === SPOTTED:
    case male === SPOTTED && female === HET_SPOTTED:
      spotted.push(HET_SPOTTED, SPOTTED);
      break;
    case male === SPOTTED && female === SPOTTED:
      spotted.push(SPOTTED);
      break;
  }
  return spotted;
};

const calculateTicked = (male, female) => {
  const ticked = [];
  switch (true) {
    case male === UNKNOWN && female === UNKNOWN:
      ticked.push(UNKNOWN);
      break;
    case male === UNKNOWN && female === NON_TICKED:
    case male === NON_TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, NON_TICKED);
      break;
    case male === UNKNOWN && female === HET_TICKED:
    case male === HET_TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, HET_TICKED);
      break;
    case male === UNKNOWN && female === TICKED:
    case male === TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, TICKED);
      break;
    case male === NON_TICKED && female === NON_TICKED:
      ticked.push(NON_TICKED);
      break;
    case male === NON_TICKED && female === HET_TICKED:
    case male === HET_TICKED && female === NON_TICKED:
      ticked.push(NON_TICKED, HET_TICKED);
      break;
    case male === NON_TICKED && female === TICKED:
    case male === TICKED && female === NON_TICKED:
      ticked.push(HET_TICKED);
      break;
    case male === HET_TICKED && female === HET_TICKED:
      ticked.push(NON_TICKED, HET_TICKED, TICKED);
      break;
    case male === HET_TICKED && female === TICKED:
    case male === TICKED && female === HET_TICKED:
      ticked.push(HET_TICKED, TICKED);
      break;
    case male === TICKED && female === TICKED:
      ticked.push(TICKED);
      break;
  }
  return ticked;
};

const calculateSilvers = (male, female) => {
  const silvers = [];
  switch (true) {
    case male === NON_SILVER && female === NON_SILVER:
      silvers.push(NON_SILVER);
      break;
    case male === NON_SILVER && female === HET_SILVER:
    case male === HET_SILVER && female === NON_SILVER:
      silvers.push(NON_SILVER, HET_SILVER);
      break;
    case male === NON_SILVER && female === SILVER:
    case male === SILVER && female === NON_SILVER:
      silvers.push(HET_SILVER);
      break;
    case male === HET_SILVER && female === HET_SILVER:
      silvers.push(NON_SILVER, HET_SILVER, SILVER);
      break;
    case male === HET_SILVER && female === SILVER:
    case male === SILVER && female === HET_SILVER:
      silvers.push(HET_SILVER, SILVER);
      break;
    case male === SILVER && female === SILVER:
      silvers.push(SILVER);
      break;
  }
  return silvers;
};

const sortDesc = (a, b) => b - a;

export default Calculator;
