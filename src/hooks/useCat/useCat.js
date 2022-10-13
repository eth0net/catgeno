import { useState } from "react";
import { BLACK, NON_SILVER, NON_WHITE, SOLID, NON_DILUTED } from "../../consts";
import { UNKNOWN } from "../../consts/patterns";

export function useCat(value = defaultState) {
  const [state, setState] = useState(value);
  const set = {};
  set.base = (e) => setState({ ...state, base: e?.target?.value || 0 });
  set.dilute = (e) => setState({ ...state, dilute: e?.target?.value || 0 });
  set.tabby = (e) => setState({ ...state, tabby: e?.target?.value || 0 });
  set.pattern1 = (e) => setState({ ...state, pattern1: e?.target?.value || 0 });
  set.pattern2 = (e) => setState({ ...state, pattern2: e?.target?.value || 0 });
  set.spotted = (e) => setState({ ...state, spotted: e?.target?.value || 0 });
  set.ticked = (e) => setState({ ...state, ticked: e?.target?.value || 0 });
  set.silver = (e) => setState({ ...state, silver: e?.target?.value || 0 });
  set.white = (e) => setState({ ...state, white: e?.target?.value || 0 });
  return [state, set];
}

export default useCat;

const defaultState = {
  base: BLACK,
  dilute: NON_DILUTED,
  tabby: SOLID,
  pattern1: UNKNOWN,
  pattern2: UNKNOWN,
  spotted: UNKNOWN,
  ticked: UNKNOWN,
  silver: NON_SILVER,
  white: NON_WHITE,
};
