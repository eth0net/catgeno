import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState, Fragment } from "react";
import { Cat } from "./cat";
import Base from "../../consts/base";
import Dilute from "../../consts/dilute";
import { useCat, useCatProps } from "../../hooks/useCat/useCat";
import { Pattern, Spotted, Ticked } from "../../consts/pattern";
import Agouti from "../../consts/agouti";
import Silver from "../../consts/silver";
import White from "../../consts/white";
import { Eyes } from "../../consts";

interface litterMember extends mappedGene {
  sex: string;
}

export function Calculator() {
  const [male, setMale] = useCat();
  const [female, setFemale] = useCat();
  const [phenos, setPhenos] = useState<mappedGeneDict>();
  const [litter, setLitter] = useState<litterMember[]>();
  const [litterSize, setLitterSize] = useState(0);
  const [showPhenos, setShowPhenos] = useState(false);
  const [showLitter, setShowLitter] = useState(false);

  const calculate = () => {
    // setPhenos(null);
    // setLitter(null);

    const bases = calculateBases(male.base, female.base);
    const dilutes = calculateDilutes(male.dilute, female.dilute);
    const agoutis = calculateAgoutis(male.agouti, female.agouti);
    const patterns = calculatePatterns(
      male.pattern1,
      male.pattern2,
      female.pattern1,
      female.pattern2,
    );
    const spotted = calculateSpotted(male.spotted, female.spotted);
    const ticked = calculateTicked(male.ticked, female.ticked);
    const silvers = calculateSilvers(male.silver, female.silver);
    const whites = calculateWhites(male.white, female.white);
    const eyes = calculateEyes(male.eyes, female.eyes);

    return mapGenes({
      bases,
      dilutes,
      agoutis,
      patterns,
      spotted,
      ticked,
      silvers,
      whites,
      eyes,
    });
  };

  const calculatePossibilities = () => {
    setPhenos(calculate());
    setShowPhenos(true);
    setShowLitter(false);
  };

  const calculateLitter = () => {
    const genes = calculate();

    const l: litterMember[] = [];
    for (let i = 0; i < litterSize; i++) {
      const sex = Math.round(Math.random()) === 1 ? "Male" : "Female";
      let roll = Math.random() * 100;
      for (const pheno of genes[sex.toLowerCase()]) {
        roll -= pheno.pct * 100;
        if (roll <= 0) {
          l.push({ ...pheno, sex });
          break;
        }
      }
    }
    setLitter(l);
    setShowPhenos(false);
    setShowLitter(true);
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Stack direction="row" spacing={4} padding={2}>
        <Cat state={male} set={setMale} />
        <Cat state={female} set={setFemale} female />
      </Stack>

      <Stack direction="row" spacing={4} padding={2}>
        <Button onClick={calculatePossibilities}>Show Possibilities</Button>
        <TextField
          label="Litter Size"
          variant="outlined"
          type="number"
          inputProps={{ min: 1 }}
          value={litterSize}
          onChange={(e) => setLitterSize(parseInt(e.target.value))}
        />
        <Button onClick={calculateLitter} disabled={!litterSize}>
          Show Litter
        </Button>
      </Stack>

      {phenos && showPhenos && (
        <Stack
          alignItems="space-evenly"
          direction="row"
          spacing={8}
          padding={2}
        >
          <Stack spacing={1}>
            <Typography align="center">Male Kittens</Typography>
            <Grid container spacing={1}>
              {phenos?.male?.map(({ pheno, pct }, idx) => (
                <Fragment key={idx}>
                  <Grid item xs={8}>
                    {pheno}
                  </Grid>
                  <Grid item xs={4}>
                    {Math.round(pct * 10000) / 100}%
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Stack>
          <Stack spacing={1}>
            <Typography textAlign="center">Female Kittens</Typography>
            <Grid container spacing={1}>
              {phenos?.female?.map(({ pheno, pct }, idx) => (
                <Fragment key={idx}>
                  <Grid item xs={8}>
                    {pheno}
                  </Grid>
                  <Grid item xs={4}>
                    {Math.round(pct * 10000) / 100}%
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Stack>
        </Stack>
      )}

      {!!litter?.length && showLitter && (
        <Stack alignItems="center" spacing={1}>
          <Typography>Litter</Typography>
          <Grid container spacing={1}>
            {litter?.map(({ pheno, sex }, idx) => (
              <Fragment key={idx}>
                <Grid item xs={8}>
                  {pheno}
                </Grid>
                <Grid item xs={4}>
                  {sex}
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}

interface GenesToMap {
  bases: Bases;
  dilutes: Dilute[];
  agoutis: Agouti[];
  patterns: Pattern[][];
  spotted: Spotted[];
  ticked: Ticked[];
  silvers: Silver[];
  whites: White[];
  eyes: Eyes[];
}

interface mappedGeneDict {
  [key: string]: mappedGene[];
}

interface mappedGene {
  pheno: string;
  count: number;
  pct: number;
}

const mapGenes = (genes: GenesToMap): mappedGeneDict => {
  return Object.fromEntries(
    Object.entries(genes.bases).map(([sex, bases]) => {
      let total = 0;
      return [
        sex,
        Object.entries(
          bases
            .map((base: Base) => spreadGenes(base, genes))
            .flat(8)
            .map(phenoString)
            .map((x: string): string => {
              total++;
              return x;
            })
            .reduce(
              (a: { [key: string]: number }, c: string) => ({
                ...a,
                [c]: 1 + (a[c] || 0),
              }),
              {},
            ) as { [key: string]: number },
        )
          .map(([pheno, count]) => ({
            pheno,
            count,
            pct: count / total,
          }))
          .sort((a, b) => b.pct - a.pct),
      ];
    }),
  ) as mappedGeneDict;
};

interface GenesToSpread {
  dilutes: Dilute[];
  agoutis: Agouti[];
  patterns: Pattern[][];
  spotted: Spotted[];
  ticked: Ticked[];
  silvers: Silver[];
  whites: White[];
  eyes: Eyes[];
}

type geneSpread = useCatProps[][][][][][][][];

const spreadGenes = (base: Base, genes: GenesToSpread): geneSpread => {
  return genes.dilutes.map((dilute: Dilute) =>
    genes.agoutis.map((agouti: Agouti) =>
      genes.patterns.map((patterns: Pattern[]) =>
        genes.spotted.map((spotted: Spotted) =>
          genes.ticked.map((ticked: Ticked) =>
            genes.silvers.map((silver: Silver) =>
              genes.whites.map((white: White) =>
                genes.eyes.map(
                  (eyes: Eyes): useCatProps => ({
                    base,
                    dilute,
                    agouti,
                    pattern1: patterns[0],
                    pattern2: patterns[1],
                    spotted,
                    ticked,
                    silver,
                    white,
                    eyes,
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
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
  eyes,
}: useCatProps) => {
  const pheno = [];

  switch (base) {
    case Base.BLACK:
      pheno.push(dilute === Dilute.DILUTED ? "Blue" : "Black");
      break;
    case Base.RED:
      pheno.push(dilute === Dilute.DILUTED ? "Cream" : "Red");
      break;
    case Base.TORTIE:
      pheno.push(
        dilute === Dilute.DILUTED
          ? "Blue Tortoiseshell"
          : "Black Tortoiseshell",
      );
      break;
  }

  if (silver === Silver.HET_SILVER || silver === Silver.SILVER) {
    pheno.push(agouti === Agouti.SOLID ? "Smoke" : "Silver");
  }

  if (agouti === Agouti.HET_TABBY || agouti === Agouti.TABBY) {
    if (ticked === Ticked.TICKED || ticked === Ticked.HET_TICKED) {
      pheno.push("Ticked");
    } else if (spotted === Spotted.SPOTTED || spotted === Spotted.HET_SPOTTED) {
      pheno.push("Spotted");
    } else if (pattern1 === Pattern.MACKEREL || pattern2 === Pattern.MACKEREL) {
      pheno.push("Mackerel");
    } else if (pattern1 === Pattern.CLASSIC || pattern2 === Pattern.CLASSIC) {
      pheno.push("Classic");
    }
    pheno.push("Tabby");
  }

  switch (white) {
    case White.HET_SPOT_WHITE:
    case White.SPOT_WHITE:
      pheno.push("with White");
      break;
    case White.HET_DOM_WHITE:
    case White.HET_DOM_SPOT_WHITE:
    case White.DOM_WHITE:
      pheno.push("White");
      break;
  }

  if (eyes === Eyes.BLUE || eyes === Eyes.HET_BLUE) {
    pheno.push("(Blue Eyed)");
  }

  return pheno.join(" ");
};

interface Bases {
  male: Base[];
  female: Base[];
}

const calculateBases = (male: Base, female: Base): Bases => {
  const bases: Bases = { male: [], female: [] };
  switch (true) {
    case male === Base.BLACK && female === Base.BLACK:
      bases.male = [Base.BLACK];
      bases.female = [Base.BLACK];
      break;
    case male === Base.BLACK && female === Base.RED:
      bases.male = [Base.RED];
      bases.female = [Base.TORTIE];
      break;
    case male === Base.BLACK && female === Base.TORTIE:
      bases.male = [Base.BLACK, Base.RED];
      bases.female = [Base.BLACK, Base.TORTIE];
      break;
    case male === Base.RED && female === Base.BLACK:
      bases.male = [Base.BLACK];
      bases.female = [Base.TORTIE];
      break;
    case male === Base.RED && female === Base.RED:
      bases.male = [Base.RED];
      bases.female = [Base.RED];
      break;
    case male === Base.RED && female === Base.TORTIE:
      bases.male = [Base.BLACK, Base.RED];
      bases.female = [Base.RED, Base.TORTIE];
      break;
  }
  return bases;
};

const calculateDilutes = (male: Dilute, female: Dilute): Dilute[] => {
  const dilutes: Dilute[] = [];
  switch (true) {
    case male === Dilute.NON_DILUTED && female === Dilute.NON_DILUTED:
      dilutes.push(
        Dilute.NON_DILUTED,
        Dilute.NON_DILUTED,
        Dilute.NON_DILUTED,
        Dilute.NON_DILUTED,
      );
      break;
    case male === Dilute.NON_DILUTED && female === Dilute.HET_DILUTED:
    case male === Dilute.HET_DILUTED && female === Dilute.NON_DILUTED:
      dilutes.push(
        Dilute.NON_DILUTED,
        Dilute.NON_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
      );
      break;
    case male === Dilute.NON_DILUTED && female === Dilute.DILUTED:
    case male === Dilute.DILUTED && female === Dilute.NON_DILUTED:
      dilutes.push(
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
      );
      break;
    case male === Dilute.HET_DILUTED && female === Dilute.HET_DILUTED:
      dilutes.push(
        Dilute.NON_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.DILUTED,
      );
      break;
    case male === Dilute.HET_DILUTED && female === Dilute.DILUTED:
    case male === Dilute.DILUTED && female === Dilute.HET_DILUTED:
      dilutes.push(
        Dilute.HET_DILUTED,
        Dilute.HET_DILUTED,
        Dilute.DILUTED,
        Dilute.DILUTED,
      );
      break;
    case male === Dilute.DILUTED && female === Dilute.DILUTED:
      dilutes.push(
        Dilute.DILUTED,
        Dilute.DILUTED,
        Dilute.DILUTED,
        Dilute.DILUTED,
      );
      break;
  }
  return dilutes;
};

const calculateAgoutis = (male: Agouti, female: Agouti): Agouti[] => {
  const agoutis: Agouti[] = [];
  switch (true) {
    case male === Agouti.SOLID && female === Agouti.SOLID:
      agoutis.push(Agouti.SOLID, Agouti.SOLID, Agouti.SOLID, Agouti.SOLID);
      break;
    case male === Agouti.SOLID && female === Agouti.HET_TABBY:
    case male === Agouti.HET_TABBY && female === Agouti.SOLID:
      agoutis.push(
        Agouti.SOLID,
        Agouti.SOLID,
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
      );
      break;
    case male === Agouti.SOLID && female === Agouti.TABBY:
    case male === Agouti.TABBY && female === Agouti.SOLID:
      agoutis.push(
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
      );
      break;
    case male === Agouti.HET_TABBY && female === Agouti.HET_TABBY:
      agoutis.push(
        Agouti.SOLID,
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
        Agouti.TABBY,
      );
      break;
    case male === Agouti.HET_TABBY && female === Agouti.TABBY:
    case male === Agouti.TABBY && female === Agouti.HET_TABBY:
      agoutis.push(
        Agouti.HET_TABBY,
        Agouti.HET_TABBY,
        Agouti.TABBY,
        Agouti.TABBY,
      );
      break;
    case male === Agouti.TABBY && female === Agouti.TABBY:
      agoutis.push(Agouti.TABBY, Agouti.TABBY, Agouti.TABBY, Agouti.TABBY);
      break;
  }
  return agoutis;
};

const calculatePatterns = (
  male1: Pattern,
  male2: Pattern,
  female1: Pattern,
  female2: Pattern,
): Pattern[][] => {
  if ([male1, male2, female1, female2].includes(Pattern.UNKNOWN))
    return [[Pattern.UNKNOWN, Pattern.UNKNOWN]];
  const patterns: Pattern[][] = [
    [male1, female1].sort(sortDesc),
    [male1, female2].sort(sortDesc),
    [male2, female1].sort(sortDesc),
    [male2, female2].sort(sortDesc),
  ];
  return patterns.sort(([a0, a1], [b0, b1]) => a0 + a1 - (b0 + b1));
};

const calculateSpotted = (male: Spotted, female: Spotted): Spotted[] => {
  if ([male, female].includes(Spotted.UNKNOWN)) return [Spotted.UNKNOWN];
  const spotted: Spotted[] = [];
  switch (true) {
    case male === Spotted.UNKNOWN && female === Spotted.UNKNOWN:
      spotted.push(
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
      );
      break;
    case male === Spotted.UNKNOWN && female === Spotted.NON_SPOTTED:
    case male === Spotted.NON_SPOTTED && female === Spotted.UNKNOWN:
      spotted.push(
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
        Spotted.NON_SPOTTED,
        Spotted.NON_SPOTTED,
      );
      break;
    case male === Spotted.UNKNOWN && female === Spotted.HET_SPOTTED:
    case male === Spotted.HET_SPOTTED && female === Spotted.UNKNOWN:
      spotted.push(
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
      );
      break;
    case male === Spotted.UNKNOWN && female === Spotted.SPOTTED:
    case male === Spotted.SPOTTED && female === Spotted.UNKNOWN:
      spotted.push(
        Spotted.UNKNOWN,
        Spotted.UNKNOWN,
        Spotted.SPOTTED,
        Spotted.SPOTTED,
      );
      break;
    case male === Spotted.NON_SPOTTED && female === Spotted.NON_SPOTTED:
      spotted.push(
        Spotted.NON_SPOTTED,
        Spotted.NON_SPOTTED,
        Spotted.NON_SPOTTED,
        Spotted.NON_SPOTTED,
      );
      break;
    case male === Spotted.NON_SPOTTED && female === Spotted.HET_SPOTTED:
    case male === Spotted.HET_SPOTTED && female === Spotted.NON_SPOTTED:
      spotted.push(
        Spotted.NON_SPOTTED,
        Spotted.NON_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
      );
      break;
    case male === Spotted.NON_SPOTTED && female === Spotted.SPOTTED:
    case male === Spotted.SPOTTED && female === Spotted.NON_SPOTTED:
      spotted.push(
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
      );
      break;
    case male === Spotted.HET_SPOTTED && female === Spotted.HET_SPOTTED:
      spotted.push(
        Spotted.NON_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.SPOTTED,
      );
      break;
    case male === Spotted.HET_SPOTTED && female === Spotted.SPOTTED:
    case male === Spotted.SPOTTED && female === Spotted.HET_SPOTTED:
      spotted.push(
        Spotted.HET_SPOTTED,
        Spotted.HET_SPOTTED,
        Spotted.SPOTTED,
        Spotted.SPOTTED,
      );
      break;
    case male === Spotted.SPOTTED && female === Spotted.SPOTTED:
      spotted.push(
        Spotted.SPOTTED,
        Spotted.SPOTTED,
        Spotted.SPOTTED,
        Spotted.SPOTTED,
      );
      break;
  }
  return spotted;
};

const calculateTicked = (male: Ticked, female: Ticked): Ticked[] => {
  if ([male, female].includes(Ticked.UNKNOWN)) return [Ticked.UNKNOWN];
  const ticked: Ticked[] = [];
  switch (true) {
    case male === Ticked.UNKNOWN && female === Ticked.UNKNOWN:
      ticked.push(
        Ticked.UNKNOWN,
        Ticked.UNKNOWN,
        Ticked.UNKNOWN,
        Ticked.UNKNOWN,
      );
      break;
    case male === Ticked.UNKNOWN && female === Ticked.NON_TICKED:
    case male === Ticked.NON_TICKED && female === Ticked.UNKNOWN:
      ticked.push(
        Ticked.UNKNOWN,
        Ticked.UNKNOWN,
        Ticked.NON_TICKED,
        Ticked.NON_TICKED,
      );
      break;
    case male === Ticked.UNKNOWN && female === Ticked.HET_TICKED:
    case male === Ticked.HET_TICKED && female === Ticked.UNKNOWN:
      ticked.push(
        Ticked.UNKNOWN,
        Ticked.UNKNOWN,
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
      );
      break;
    case male === Ticked.UNKNOWN && female === Ticked.TICKED:
    case male === Ticked.TICKED && female === Ticked.UNKNOWN:
      ticked.push(Ticked.UNKNOWN, Ticked.UNKNOWN, Ticked.TICKED, Ticked.TICKED);
      break;
    case male === Ticked.NON_TICKED && female === Ticked.NON_TICKED:
      ticked.push(
        Ticked.NON_TICKED,
        Ticked.NON_TICKED,
        Ticked.NON_TICKED,
        Ticked.NON_TICKED,
      );
      break;
    case male === Ticked.NON_TICKED && female === Ticked.HET_TICKED:
    case male === Ticked.HET_TICKED && female === Ticked.NON_TICKED:
      ticked.push(
        Ticked.NON_TICKED,
        Ticked.NON_TICKED,
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
      );
      break;
    case male === Ticked.NON_TICKED && female === Ticked.TICKED:
    case male === Ticked.TICKED && female === Ticked.NON_TICKED:
      ticked.push(
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
      );
      break;
    case male === Ticked.HET_TICKED && female === Ticked.HET_TICKED:
      ticked.push(
        Ticked.NON_TICKED,
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
        Ticked.TICKED,
      );
      break;
    case male === Ticked.HET_TICKED && female === Ticked.TICKED:
    case male === Ticked.TICKED && female === Ticked.HET_TICKED:
      ticked.push(
        Ticked.HET_TICKED,
        Ticked.HET_TICKED,
        Ticked.TICKED,
        Ticked.TICKED,
      );
      break;
    case male === Ticked.TICKED && female === Ticked.TICKED:
      ticked.push(Ticked.TICKED, Ticked.TICKED, Ticked.TICKED, Ticked.TICKED);
      break;
  }
  return ticked;
};

const calculateSilvers = (male: Silver, female: Silver): Silver[] => {
  const silvers: Silver[] = [];
  switch (true) {
    case male === Silver.NON_SILVER && female === Silver.NON_SILVER:
      silvers.push(
        Silver.NON_SILVER,
        Silver.NON_SILVER,
        Silver.NON_SILVER,
        Silver.NON_SILVER,
      );
      break;
    case male === Silver.NON_SILVER && female === Silver.HET_SILVER:
    case male === Silver.HET_SILVER && female === Silver.NON_SILVER:
      silvers.push(
        Silver.NON_SILVER,
        Silver.NON_SILVER,
        Silver.HET_SILVER,
        Silver.HET_SILVER,
      );
      break;
    case male === Silver.NON_SILVER && female === Silver.SILVER:
    case male === Silver.SILVER && female === Silver.NON_SILVER:
      silvers.push(
        Silver.HET_SILVER,
        Silver.HET_SILVER,
        Silver.HET_SILVER,
        Silver.HET_SILVER,
      );
      break;
    case male === Silver.HET_SILVER && female === Silver.HET_SILVER:
      silvers.push(
        Silver.NON_SILVER,
        Silver.HET_SILVER,
        Silver.HET_SILVER,
        Silver.SILVER,
      );
      break;
    case male === Silver.HET_SILVER && female === Silver.SILVER:
    case male === Silver.SILVER && female === Silver.HET_SILVER:
      silvers.push(
        Silver.HET_SILVER,
        Silver.HET_SILVER,
        Silver.SILVER,
        Silver.SILVER,
      );
      break;
    case male === Silver.SILVER && female === Silver.SILVER:
      silvers.push(Silver.SILVER, Silver.SILVER, Silver.SILVER, Silver.SILVER);
      break;
  }
  return silvers;
};

const calculateWhites = (male: White, female: White): White[] => {
  const whites: White[] = [];
  switch (true) {
    case male === White.NON_WHITE && female === White.NON_WHITE:
      whites.push(
        White.NON_WHITE,
        White.NON_WHITE,
        White.NON_WHITE,
        White.NON_WHITE,
      );
      break;
    case male === White.NON_WHITE && female === White.HET_SPOT_WHITE:
    case male === White.HET_SPOT_WHITE && female === White.NON_WHITE:
      whites.push(
        White.NON_WHITE,
        White.NON_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
      );
      break;
    case male === White.NON_WHITE && female === White.SPOT_WHITE:
    case male === White.SPOT_WHITE && female === White.NON_WHITE:
      whites.push(
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
      );
      break;
    case male === White.NON_WHITE && female === White.HET_DOM_WHITE:
    case male === White.HET_DOM_WHITE && female === White.NON_WHITE:
      whites.push(
        White.NON_WHITE,
        White.NON_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
      );
      break;
    case male === White.NON_WHITE && female === White.HET_DOM_SPOT_WHITE:
    case male === White.HET_DOM_SPOT_WHITE && female === White.NON_WHITE:
      whites.push(
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
      );
      break;
    case male === White.NON_WHITE && female === White.DOM_WHITE:
    case male === White.DOM_WHITE && female === White.NON_WHITE:
      whites.push(
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
      );
      break;
    case male === White.HET_SPOT_WHITE && female === White.HET_SPOT_WHITE:
      whites.push(
        White.NON_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
        White.SPOT_WHITE,
      );
      break;
    case male === White.HET_SPOT_WHITE && female === White.SPOT_WHITE:
    case male === White.SPOT_WHITE && female === White.HET_SPOT_WHITE:
      whites.push(White.HET_SPOT_WHITE, White.SPOT_WHITE);
      break;
    case male === White.HET_SPOT_WHITE && female === White.HET_DOM_WHITE:
    case male === White.HET_DOM_WHITE && female === White.HET_SPOT_WHITE:
      whites.push(
        White.NON_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.HET_SPOT_WHITE && female === White.HET_DOM_SPOT_WHITE:
    case male === White.HET_DOM_SPOT_WHITE && female === White.HET_SPOT_WHITE:
      whites.push(
        White.HET_SPOT_WHITE,
        White.SPOT_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.HET_SPOT_WHITE && female === White.DOM_WHITE:
    case male === White.DOM_WHITE && female === White.HET_SPOT_WHITE:
      whites.push(
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.SPOT_WHITE && female === White.SPOT_WHITE:
      whites.push(
        White.SPOT_WHITE,
        White.SPOT_WHITE,
        White.SPOT_WHITE,
        White.SPOT_WHITE,
      );
      break;
    case male === White.SPOT_WHITE && female === White.HET_DOM_WHITE:
    case male === White.HET_DOM_WHITE && female === White.SPOT_WHITE:
      whites.push(
        White.HET_SPOT_WHITE,
        White.HET_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.SPOT_WHITE && female === White.HET_DOM_SPOT_WHITE:
    case male === White.HET_DOM_SPOT_WHITE && female === White.SPOT_WHITE:
      whites.push(
        White.SPOT_WHITE,
        White.SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.SPOT_WHITE && female === White.DOM_WHITE:
    case male === White.DOM_WHITE && female === White.SPOT_WHITE:
      whites.push(
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
      );
      break;
    case male === White.HET_DOM_WHITE && female === White.HET_DOM_WHITE:
      whites.push(
        White.NON_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
        White.DOM_WHITE,
      );
      break;
    case male === White.HET_DOM_WHITE && female === White.HET_DOM_SPOT_WHITE:
    case male === White.HET_DOM_SPOT_WHITE && female === White.HET_DOM_WHITE:
      whites.push(
        White.HET_SPOT_WHITE,
        White.HET_DOM_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.DOM_WHITE,
      );
      break;
    case male === White.HET_DOM_WHITE && female === White.DOM_WHITE:
    case male === White.DOM_WHITE && female === White.HET_DOM_WHITE:
      whites.push(
        White.HET_DOM_WHITE,
        White.HET_DOM_WHITE,
        White.DOM_WHITE,
        White.DOM_WHITE,
      );
      break;
    case male === White.HET_DOM_SPOT_WHITE &&
      female === White.HET_DOM_SPOT_WHITE:
      whites.push(
        White.SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.DOM_WHITE,
      );
      break;
    case male === White.HET_DOM_SPOT_WHITE && female === White.DOM_WHITE:
    case male === White.DOM_WHITE && female === White.HET_DOM_SPOT_WHITE:
      whites.push(
        White.HET_DOM_SPOT_WHITE,
        White.HET_DOM_SPOT_WHITE,
        White.DOM_WHITE,
        White.DOM_WHITE,
      );
      break;
    case male === White.DOM_WHITE && female === White.DOM_WHITE:
      whites.push(
        White.DOM_WHITE,
        White.DOM_WHITE,
        White.DOM_WHITE,
        White.DOM_WHITE,
      );
      break;
  }
  return whites;
};

const calculateEyes = (male: Eyes, female: Eyes): Eyes[] => {
  const eyes: Eyes[] = [];
  switch (true) {
    case male === Eyes.NON_BLUE && female === Eyes.NON_BLUE:
      eyes.push(Eyes.NON_BLUE, Eyes.NON_BLUE, Eyes.NON_BLUE, Eyes.NON_BLUE);
      break;
    case male === Eyes.NON_BLUE && female === Eyes.HET_BLUE:
    case male === Eyes.HET_BLUE && female === Eyes.NON_BLUE:
      eyes.push(Eyes.NON_BLUE, Eyes.NON_BLUE, Eyes.HET_BLUE, Eyes.HET_BLUE);
      break;
    case male === Eyes.NON_BLUE && female === Eyes.BLUE:
    case male === Eyes.BLUE && female === Eyes.NON_BLUE:
      eyes.push(Eyes.HET_BLUE, Eyes.HET_BLUE, Eyes.HET_BLUE, Eyes.HET_BLUE);
      break;
    case male === Eyes.HET_BLUE && female === Eyes.HET_BLUE:
      eyes.push(Eyes.NON_BLUE, Eyes.HET_BLUE, Eyes.HET_BLUE, Eyes.BLUE);
      break;
    case male === Eyes.HET_BLUE && female === Eyes.BLUE:
    case male === Eyes.BLUE && female === Eyes.HET_BLUE:
      eyes.push(Eyes.HET_BLUE, Eyes.HET_BLUE, Eyes.BLUE, Eyes.BLUE);
      break;
    case male === Eyes.BLUE && female === Eyes.BLUE:
      eyes.push(Eyes.BLUE, Eyes.BLUE, Eyes.BLUE, Eyes.BLUE);
      break;
  }
  return eyes;
};

const sortDesc = (a: Pattern, b: Pattern) => b - a;

export default Calculator;
