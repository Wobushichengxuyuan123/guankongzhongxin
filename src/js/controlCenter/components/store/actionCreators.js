/* eslint-disable */
import {constants} from "./index";

export const test = (info) =>({
  type: constants.TEST,
  data: info,
});

export const info = (info) =>({
  type: constants.INFO,
  data: info,
});

export const infoZ = (info) =>({
  type: constants.INFOZ,
  data: info,
});

export const isAoTuAlter = (info) =>({
  type: constants.ISAOTUALTER,
  data: info,
});

export const alarmCount = (info) =>({
  type: constants.ALARMCOUNT,
  data: info,
});
/* eslint-enable */