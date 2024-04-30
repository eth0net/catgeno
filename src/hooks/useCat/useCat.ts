import { useState } from "react";
import Agouti from "../../consts/agouti";
import Base from "../../consts/base";
import Dilute from "../../consts/dilute";
import Eyes from "../../consts/eyes";
import { Pattern, Spotted, Ticked } from "../../consts/pattern";
import Silver from "../../consts/silver";
import White from "../../consts/white";
import { SelectChangeEvent } from "@mui/material";

export interface useCatProps {
  base: Base;
  dilute: Dilute;
  agouti: Agouti;
  pattern1: Pattern;
  pattern2: Pattern;
  spotted: Spotted;
  ticked: Ticked;
  silver: Silver;
  white: White;
  eyes: Eyes;
}

export interface useCatSet {
  base: (e: SelectChangeEvent<unknown>) => void;
  dilute: (e: SelectChangeEvent<unknown>) => void;
  agouti: (e: SelectChangeEvent<unknown>) => void;
  pattern1: (e: SelectChangeEvent<unknown>) => void;
  pattern2: (e: SelectChangeEvent<unknown>) => void;
  spotted: (e: SelectChangeEvent<unknown>) => void;
  ticked: (e: SelectChangeEvent<unknown>) => void;
  silver: (e: SelectChangeEvent<unknown>) => void;
  white: (e: SelectChangeEvent<unknown>) => void;
  eyes: (e: SelectChangeEvent<unknown>) => void;
}

export function useCat(
  value: useCatProps = defaultState,
): [useCatProps, useCatSet] {
  const [state, setState] = useState(value);
  const set = {} as useCatSet;
  set.base = (e) =>
    setState({ ...state, base: (e?.target?.value as Base) || 0 });
  set.dilute = (e) =>
    setState({ ...state, dilute: (e?.target?.value as Dilute) || 0 });
  set.agouti = (e) =>
    setState({ ...state, agouti: (e?.target?.value as Agouti) || 0 });
  set.pattern1 = (e) =>
    setState({ ...state, pattern1: (e?.target?.value as Pattern) || 0 });
  set.pattern2 = (e) =>
    setState({ ...state, pattern2: (e?.target?.value as Pattern) || 0 });
  set.spotted = (e) =>
    setState({ ...state, spotted: (e?.target?.value as Spotted) || 0 });
  set.ticked = (e) =>
    setState({ ...state, ticked: (e?.target?.value as Ticked) || 0 });
  set.silver = (e) =>
    setState({ ...state, silver: (e?.target?.value as Silver) || 0 });
  set.white = (e) =>
    setState({ ...state, white: (e?.target?.value as White) || 0 });
  set.eyes = (e) =>
    setState({ ...state, eyes: (e?.target?.value as Eyes) || 0 });
  return [state, set];
}

export default useCat;

const defaultState: useCatProps = {
  base: Base.BLACK,
  dilute: Dilute.NON_DILUTED,
  agouti: Agouti.SOLID,
  pattern1: Pattern.UNKNOWN,
  pattern2: Pattern.UNKNOWN,
  spotted: Spotted.UNKNOWN,
  ticked: Ticked.UNKNOWN,
  silver: Silver.NON_SILVER,
  white: White.NON_WHITE,
  eyes: Eyes.NON_BLUE,
};
