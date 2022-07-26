import { useState } from "react";

export function useCat(value = defaultState) {
  const [state, setState] = useState(value);
  const set = {};
  set.base = (e) => setState({ ...state, base: e?.target?.value || 0 });
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
  base: 0,
  tabby: 0,
  pattern1: 0,
  pattern2: 0,
  spotted: 0,
  ticked: 0,
  silver: 0,
  white: 0,
};
