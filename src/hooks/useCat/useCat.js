import { useState } from "react";
import { SOLID } from "../../consts/agouti";
import { BLACK } from "../../consts/base";
import { NON_DILUTED } from "../../consts/dilute";
import { NON_BLUE } from "../../consts/eyes";
import { UNKNOWN } from "../../consts/pattern";
import { NON_SILVER } from "../../consts/silver";
import { NON_WHITE } from "../../consts/white";

export function useCat(value = defaultState) {
  const [state, setState] = useState(value);
  const set = {};
  set.base = (e) => setState({ ...state, base: e?.target?.value || 0 });
  set.dilute = (e) => setState({ ...state, dilute: e?.target?.value || 0 });
  set.agouti = (e) => setState({ ...state, agouti: e?.target?.value || 0 });
  set.pattern1 = (e) => setState({ ...state, pattern1: e?.target?.value || 0 });
  set.pattern2 = (e) => setState({ ...state, pattern2: e?.target?.value || 0 });
  set.spotted = (e) => setState({ ...state, spotted: e?.target?.value || 0 });
  set.ticked = (e) => setState({ ...state, ticked: e?.target?.value || 0 });
  set.silver = (e) => setState({ ...state, silver: e?.target?.value || 0 });
  set.white = (e) => setState({ ...state, white: e?.target?.value || 0 });
  set.eyes = (e) => setState({ ...state, eyes: e?.target?.value || 0 });
  return [state, set];
}

export default useCat;

const defaultState = {
  base: BLACK,
  dilute: NON_DILUTED,
  agouti: SOLID,
  pattern1: UNKNOWN,
  pattern2: UNKNOWN,
  spotted: UNKNOWN,
  ticked: UNKNOWN,
  silver: NON_SILVER,
  white: NON_WHITE,
  eyes: NON_BLUE,
};
