import { Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { HET_TABBY, SOLID, TABBY } from "../../consts/agouti";
import { BLACK, RED, TORTIE } from "../../consts/base";
import { DILUTED, HET_DILUTED, NON_DILUTED } from "../../consts/dilute";
import { BLUE, HET_BLUE, NON_BLUE } from "../../consts/eyes";
import {
  CLASSIC,
  HET_SPOTTED,
  HET_TICKED,
  MACKEREL,
  NON_SPOTTED,
  NON_TICKED,
  SPOTTED,
  TICKED,
  UNKNOWN,
} from "../../consts/pattern";
import { HET_SILVER, NON_SILVER, SILVER } from "../../consts/silver";
import {
  DOM_WHITE,
  HET_DOM_SPOT_WHITE as DOM_SPOT_WHITE,
  HET_DOM_WHITE,
  HET_SPOT_WHITE,
  NON_WHITE,
  SPOT_WHITE,
} from "../../consts/white";
import { useCat } from "../../hooks";
import { Cat } from "./cat";

export function Calculator() {
  const [male, setMale] = useCat();
  const [female, setFemale] = useCat();
  const [genes, setGenes] = useState();

  const calculate = () => {
    const bases = calculateBases(male.base, female.base);
    const dilutes = calculateDilutes(male.dilute, female.dilute);
    const agoutis = calculateAgoutis(male.agouti, female.agouti);
    const patterns = calculatePatterns(
      male.pattern1,
      male.pattern2,
      female.pattern1,
      female.pattern2
    );
    const spotted = calculateSpotted(male.spotted, female.spotted);
    const ticked = calculateTicked(male.ticked, female.ticked);
    const silvers = calculateSilvers(male.silver, female.silver);
    const whites = calculateWhites(male.white, female.white);
    const eyes = calculateEyes(male.eyes, female.eyes);

    setGenes(
      mapGenes({
        bases,
        dilutes,
        agoutis,
        patterns,
        spotted,
        ticked,
        silvers,
        whites,
        eyes,
      })
    );
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Stack direction="row" spacing={4} padding={2}>
        <Cat state={male} set={setMale} />
        <Cat state={female} set={setFemale} female />
      </Stack>

      <Button onClick={calculate}>Calculate</Button>

      {genes && (
        <Stack alignItems="space-evenly" direction="row" spacing={8}>
          <Stack alignItems="center" spacing={1}>
            <Typography>Male Kittens</Typography>
            <Grid container spacing={1}>
              {genes?.male?.map((p) => (
                <>
                  <Grid item xs={10}>{p.pheno}</Grid>
                  <Grid item xs={2}>{Math.round(p.pct * 10000) / 100}%</Grid>
                </>
              ))}
            </Grid>
          </Stack>
          <Stack alignItems="center" spacing={1}>
            <Typography>Female Kittens</Typography>
            <Grid container spacing={1}>
              {genes?.female?.map((p, i) => (
                <>
                  <Grid item xs={10}>{p.pheno}</Grid>
                  <Grid item xs={2}>{Math.round(p.pct * 10000) / 100}%</Grid>
                </>
              ))}
            </Grid>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

const mapGenes = (genes) => {
  return Object.fromEntries(
    Object.entries(genes.bases).map(([sex, bases]) => {
      let total = 0;
      return [
        sex,
        Object.entries(
          bases
            .map((base) => spreadGenes(base, genes))
            .flat(8)
            .map(phenoString)
            .map((x) => (total++, x))
            .reduce((a, c) => ({ ...a, [c]: 1 + (a[c] || 0) }), {})
        ).map(([pheno, count]) => ({ pheno, count, pct: count / total }))
          .sort((a, b) => b.pct - a.pct),
      ];
    })
  );
};

const spreadGenes = (base, genes) => {
  return genes.dilutes.map((dilute) =>
    genes.agoutis.map((agouti) =>
      genes.patterns.map((pattern) =>
        genes.spotted.map((spotted) =>
          genes.ticked.map((ticked) =>
            genes.silvers.map((silver) =>
              genes.whites.map((white) =>
                genes.eyes.map((eye) => ({
                  base,
                  dilute,
                  agouti,
                  pattern1: pattern[0],
                  pattern2: pattern[1],
                  spotted,
                  ticked,
                  silver,
                  white,
                  eye,
                }))
              )
            )
          )
        )
      )
    )
  );
};

const phenoString = ({
  base,
  dilute,
  agouti,
  pattern1,
  pattern2,
  spotted,
  ticked,
  silver,
  white,
  eye,
}) => {
  let pheno = [];

  switch (base) {
    case BLACK:
      pheno.push(dilute === DILUTED ? "Blue" : "Black");
      break;
    case RED:
      pheno.push(dilute === DILUTED ? "Cream" : "Red");
      break;
    case TORTIE:
      pheno.push(
        dilute === DILUTED ? "Blue Tortoiseshell" : "Black Tortoiseshell"
      );
      break;
  }

  if (agouti === HET_TABBY || agouti === TABBY) {
    if (ticked === TICKED || ticked === HET_TICKED) {
      pheno.push("Ticked Tabby");
    } else if (spotted === SPOTTED || spotted === HET_SPOTTED) {
      pheno.push("Spotted Tabby");
    } else if (pattern1 === MACKEREL || pattern2 === MACKEREL) {
      pheno.push("Mackerel Tabby");
    } else if (pattern1 === CLASSIC || pattern2 === CLASSIC) {
      pheno.push("Classic Tabby");
    }
  }

  if (silver === HET_SILVER || silver === SILVER) {
    pheno.push("Silver");
  }

  switch (white) {
    case HET_SPOT_WHITE:
      pheno.push("0-50% White");
      break;
    case SPOT_WHITE:
      pheno.push("50-100% White");
      break;
    case HET_DOM_WHITE:
    case DOM_SPOT_WHITE:
    case DOM_WHITE:
      pheno.push("White");
      break;
  }

  if (eye === BLUE || eye === HET_BLUE) {
    pheno.push("(Blue Eyed)");
  }

  return pheno.join(" ");
};

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
      dilutes.push(NON_DILUTED, NON_DILUTED, NON_DILUTED, NON_DILUTED);
      break;
    case male === NON_DILUTED && female === HET_DILUTED:
    case male === HET_DILUTED && female === NON_DILUTED:
      dilutes.push(NON_DILUTED, NON_DILUTED, HET_DILUTED, HET_DILUTED);
      break;
    case male === NON_DILUTED && female === DILUTED:
    case male === DILUTED && female === NON_DILUTED:
      dilutes.push(HET_DILUTED, HET_DILUTED, HET_DILUTED, HET_DILUTED);
      break;
    case male === HET_DILUTED && female === HET_DILUTED:
      dilutes.push(NON_DILUTED, HET_DILUTED, HET_DILUTED, DILUTED);
      break;
    case male === HET_DILUTED && female === DILUTED:
    case male === DILUTED && female === HET_DILUTED:
      dilutes.push(HET_DILUTED, HET_DILUTED, DILUTED, DILUTED);
      break;
    case male === DILUTED && female === DILUTED:
      dilutes.push(DILUTED, DILUTED, DILUTED, DILUTED);
      break;
  }
  return dilutes;
};

const calculateAgoutis = (male, female) => {
  const agoutis = [];
  switch (true) {
    case male === SOLID && female === SOLID:
      agoutis.push(SOLID, SOLID, SOLID, SOLID);
      break;
    case male === SOLID && female === HET_TABBY:
    case male === HET_TABBY && female === SOLID:
      agoutis.push(SOLID, SOLID, HET_TABBY, HET_TABBY);
      break;
    case male === SOLID && female === TABBY:
    case male === TABBY && female === SOLID:
      agoutis.push(HET_TABBY, HET_TABBY, HET_TABBY, HET_TABBY);
      break;
    case male === HET_TABBY && female === HET_TABBY:
      agoutis.push(SOLID, HET_TABBY, HET_TABBY, TABBY);
      break;
    case male === HET_TABBY && female === TABBY:
    case male === TABBY && female === HET_TABBY:
      agoutis.push(HET_TABBY, HET_TABBY, TABBY, TABBY);
      break;
    case male === TABBY && female === TABBY:
      agoutis.push(TABBY, TABBY, TABBY, TABBY);
      break;
  }
  return agoutis;
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
      spotted.push(UNKNOWN, UNKNOWN, UNKNOWN, UNKNOWN);
      break;
    case male === UNKNOWN && female === NON_SPOTTED:
    case male === NON_SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, UNKNOWN, NON_SPOTTED, NON_SPOTTED);
      break;
    case male === UNKNOWN && female === HET_SPOTTED:
    case male === HET_SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, UNKNOWN, HET_SPOTTED, HET_SPOTTED);
      break;
    case male === UNKNOWN && female === SPOTTED:
    case male === SPOTTED && female === UNKNOWN:
      spotted.push(UNKNOWN, UNKNOWN, SPOTTED, SPOTTED);
      break;
    case male === NON_SPOTTED && female === NON_SPOTTED:
      spotted.push(NON_SPOTTED, NON_SPOTTED, NON_SPOTTED, NON_SPOTTED);
      break;
    case male === NON_SPOTTED && female === HET_SPOTTED:
    case male === HET_SPOTTED && female === NON_SPOTTED:
      spotted.push(NON_SPOTTED, NON_SPOTTED, HET_SPOTTED, HET_SPOTTED);
      break;
    case male === NON_SPOTTED && female === SPOTTED:
    case male === SPOTTED && female === NON_SPOTTED:
      spotted.push(HET_SPOTTED, HET_SPOTTED, HET_SPOTTED, HET_SPOTTED);
      break;
    case male === HET_SPOTTED && female === HET_SPOTTED:
      spotted.push(NON_SPOTTED, HET_SPOTTED, HET_SPOTTED, SPOTTED);
      break;
    case male === HET_SPOTTED && female === SPOTTED:
    case male === SPOTTED && female === HET_SPOTTED:
      spotted.push(HET_SPOTTED, HET_SPOTTED, SPOTTED, SPOTTED);
      break;
    case male === SPOTTED && female === SPOTTED:
      spotted.push(SPOTTED, SPOTTED, SPOTTED, SPOTTED);
      break;
  }
  return spotted;
};

const calculateTicked = (male, female) => {
  const ticked = [];
  switch (true) {
    case male === UNKNOWN && female === UNKNOWN:
      ticked.push(UNKNOWN, UNKNOWN, UNKNOWN, UNKNOWN);
      break;
    case male === UNKNOWN && female === NON_TICKED:
    case male === NON_TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, UNKNOWN, NON_TICKED, NON_TICKED);
      break;
    case male === UNKNOWN && female === HET_TICKED:
    case male === HET_TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, UNKNOWN, HET_TICKED, HET_TICKED);
      break;
    case male === UNKNOWN && female === TICKED:
    case male === TICKED && female === UNKNOWN:
      ticked.push(UNKNOWN, UNKNOWN, TICKED, TICKED);
      break;
    case male === NON_TICKED && female === NON_TICKED:
      ticked.push(NON_TICKED, NON_TICKED, NON_TICKED, NON_TICKED);
      break;
    case male === NON_TICKED && female === HET_TICKED:
    case male === HET_TICKED && female === NON_TICKED:
      ticked.push(NON_TICKED, NON_TICKED, HET_TICKED, HET_TICKED);
      break;
    case male === NON_TICKED && female === TICKED:
    case male === TICKED && female === NON_TICKED:
      ticked.push(HET_TICKED, HET_TICKED, HET_TICKED, HET_TICKED);
      break;
    case male === HET_TICKED && female === HET_TICKED:
      ticked.push(NON_TICKED, HET_TICKED, HET_TICKED, TICKED);
      break;
    case male === HET_TICKED && female === TICKED:
    case male === TICKED && female === HET_TICKED:
      ticked.push(HET_TICKED, HET_TICKED, TICKED, TICKED);
      break;
    case male === TICKED && female === TICKED:
      ticked.push(TICKED, TICKED, TICKED, TICKED);
      break;
  }
  return ticked;
};

const calculateSilvers = (male, female) => {
  const silvers = [];
  switch (true) {
    case male === NON_SILVER && female === NON_SILVER:
      silvers.push(NON_SILVER, NON_SILVER, NON_SILVER, NON_SILVER);
      break;
    case male === NON_SILVER && female === HET_SILVER:
    case male === HET_SILVER && female === NON_SILVER:
      silvers.push(NON_SILVER, NON_SILVER, HET_SILVER, HET_SILVER);
      break;
    case male === NON_SILVER && female === SILVER:
    case male === SILVER && female === NON_SILVER:
      silvers.push(HET_SILVER, HET_SILVER, HET_SILVER, HET_SILVER);
      break;
    case male === HET_SILVER && female === HET_SILVER:
      silvers.push(NON_SILVER, HET_SILVER, HET_SILVER, SILVER);
      break;
    case male === HET_SILVER && female === SILVER:
    case male === SILVER && female === HET_SILVER:
      silvers.push(HET_SILVER, HET_SILVER, SILVER, SILVER);
      break;
    case male === SILVER && female === SILVER:
      silvers.push(SILVER, SILVER, SILVER, SILVER);
      break;
  }
  return silvers;
};

const calculateWhites = (male, female) => {
  const whites = [];
  switch (true) {
    case male === NON_WHITE && female === NON_WHITE:
      whites.push(NON_WHITE, NON_WHITE, NON_WHITE, NON_WHITE);
      break;
    case male === NON_WHITE && female === HET_SPOT_WHITE:
    case male === HET_SPOT_WHITE && female === NON_WHITE:
      whites.push(NON_WHITE, NON_WHITE, HET_SPOT_WHITE, HET_SPOT_WHITE);
      break;
    case male === NON_WHITE && female === SPOT_WHITE:
    case male === SPOT_WHITE && female === NON_WHITE:
      whites.push(
        HET_SPOT_WHITE,
        HET_SPOT_WHITE,
        HET_SPOT_WHITE,
        HET_SPOT_WHITE
      );
      break;
    case male === NON_WHITE && female === HET_DOM_WHITE:
    case male === HET_DOM_WHITE && female === NON_WHITE:
      whites.push(NON_WHITE, NON_WHITE, HET_DOM_WHITE, HET_DOM_WHITE);
      break;
    case male === NON_WHITE && female === DOM_SPOT_WHITE:
    case male === DOM_SPOT_WHITE && female === NON_WHITE:
      whites.push(HET_SPOT_WHITE, HET_SPOT_WHITE, HET_DOM_WHITE, HET_DOM_WHITE);
      break;
    case male === NON_WHITE && female === DOM_WHITE:
    case male === DOM_WHITE && female === NON_WHITE:
      whites.push(HET_DOM_WHITE, HET_DOM_WHITE, HET_DOM_WHITE, HET_DOM_WHITE);
      break;
    case male === HET_SPOT_WHITE && female === HET_SPOT_WHITE:
      whites.push(NON_WHITE, HET_SPOT_WHITE, HET_SPOT_WHITE, SPOT_WHITE);
      break;
    case male === HET_SPOT_WHITE && female === SPOT_WHITE:
    case male === SPOT_WHITE && female === HET_SPOT_WHITE:
      whites.push(HET_SPOT_WHITE, SPOT_WHITE);
      break;
    case male === HET_SPOT_WHITE && female === HET_DOM_WHITE:
    case male === HET_DOM_WHITE && female === HET_SPOT_WHITE:
      whites.push(NON_WHITE, HET_SPOT_WHITE, HET_DOM_WHITE, DOM_SPOT_WHITE);
      break;
    case male === HET_SPOT_WHITE && female === DOM_SPOT_WHITE:
    case male === DOM_SPOT_WHITE && female === HET_SPOT_WHITE:
      whites.push(HET_SPOT_WHITE, SPOT_WHITE, HET_DOM_WHITE, DOM_SPOT_WHITE);
      break;
    case male === HET_SPOT_WHITE && female === DOM_WHITE:
    case male === DOM_WHITE && female === HET_SPOT_WHITE:
      whites.push(HET_DOM_WHITE, HET_DOM_WHITE, DOM_SPOT_WHITE, DOM_SPOT_WHITE);
      break;
    case male === SPOT_WHITE && female === SPOT_WHITE:
      whites.push(SPOT_WHITE, SPOT_WHITE, SPOT_WHITE, SPOT_WHITE);
      break;
    case male === SPOT_WHITE && female === HET_DOM_WHITE:
    case male === HET_DOM_WHITE && female === SPOT_WHITE:
      whites.push(
        HET_SPOT_WHITE,
        HET_SPOT_WHITE,
        DOM_SPOT_WHITE,
        DOM_SPOT_WHITE
      );
      break;
    case male === SPOT_WHITE && female === DOM_SPOT_WHITE:
    case male === DOM_SPOT_WHITE && female === SPOT_WHITE:
      whites.push(SPOT_WHITE, SPOT_WHITE, DOM_SPOT_WHITE, DOM_SPOT_WHITE);
      break;
    case male === SPOT_WHITE && female === DOM_WHITE:
    case male === DOM_WHITE && female === SPOT_WHITE:
      whites.push(
        DOM_SPOT_WHITE,
        DOM_SPOT_WHITE,
        DOM_SPOT_WHITE,
        DOM_SPOT_WHITE
      );
      break;
    case male === HET_DOM_WHITE && female === HET_DOM_WHITE:
      whites.push(NON_WHITE, HET_DOM_WHITE, HET_DOM_WHITE, DOM_WHITE);
      break;
    case male === HET_DOM_WHITE && female === DOM_SPOT_WHITE:
    case male === DOM_SPOT_WHITE && female === HET_DOM_WHITE:
      whites.push(HET_SPOT_WHITE, HET_DOM_WHITE, DOM_SPOT_WHITE, DOM_WHITE);
      break;
    case male === HET_DOM_WHITE && female === DOM_WHITE:
    case male === DOM_WHITE && female === HET_DOM_WHITE:
      whites.push(HET_DOM_WHITE, HET_DOM_WHITE, DOM_WHITE, DOM_WHITE);
      break;
    case male === DOM_SPOT_WHITE && female === DOM_SPOT_WHITE:
      whites.push(SPOT_WHITE, DOM_SPOT_WHITE, DOM_SPOT_WHITE, DOM_WHITE);
      break;
    case male === DOM_SPOT_WHITE && female === DOM_WHITE:
    case male === DOM_WHITE && female === DOM_SPOT_WHITE:
      whites.push(DOM_SPOT_WHITE, DOM_SPOT_WHITE, DOM_WHITE, DOM_WHITE);
      break;
    case male === DOM_WHITE && female === DOM_WHITE:
      whites.push(DOM_WHITE, DOM_WHITE, DOM_WHITE, DOM_WHITE);
      break;
  }
  return whites;
};

const calculateEyes = (male, female) => {
  const eyes = [];
  switch (true) {
    case male === NON_BLUE && female === NON_BLUE:
      eyes.push(NON_BLUE, NON_BLUE, NON_BLUE, NON_BLUE);
      break;
    case male === NON_BLUE && female === HET_BLUE:
    case male === HET_BLUE && female === NON_BLUE:
      eyes.push(NON_BLUE, NON_BLUE, HET_BLUE, HET_BLUE);
      break;
    case male === NON_BLUE && female === BLUE:
    case male === BLUE && female === NON_BLUE:
      eyes.push(HET_BLUE, HET_BLUE, HET_BLUE, HET_BLUE);
      break;
    case male === HET_BLUE && female === HET_BLUE:
      eyes.push(NON_BLUE, HET_BLUE, HET_BLUE, BLUE);
      break;
    case male === HET_BLUE && female === BLUE:
    case male === BLUE && female === HET_BLUE:
      eyes.push(HET_BLUE, HET_BLUE, BLUE, BLUE);
      break;
    case male === BLUE && female === BLUE:
      eyes.push(BLUE, BLUE, BLUE, BLUE);
      break;
  }
  return eyes;
};

const sortDesc = (a, b) => b - a;

export default Calculator;
