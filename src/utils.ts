import { FixedNumber } from "@ethersproject/bignumber";
import { calcYield } from "./components/farm/TYield";
import { PoolDetails } from "./types";

/** Get current time in seconds */
export const now = () => Math.round(Date.now() / 1000);

const calcMultiplierNum = (duration: string) => Number(duration) * (5 / 180) + 1;
export const calcMultiplier = (duration: string) => calcMultiplierNum(duration).toFixed(2);

// TODO: Factor in that the entire duration is only 180 days
// TODO: Warn the user if they lock for longer than the remaining time
export function calcApr(pool: PoolDetails, duration: string) {
  const yield24Hr = calcYield(pool, 1).toUnsafeFloat();
  const multiplier = calcMultiplierNum(duration);
  const nDuration = Number(duration);
  const baseApr = yield24Hr * 365;
  const lockApr = baseApr * multiplier;
  const apr = (nDuration * yield24Hr * multiplier + (180 - nDuration) * yield24Hr) * (365 / 180);
  return {
    baseApr: baseApr.toFixed(2),
    lockApr: lockApr.toFixed(2),
    apr: apr.toFixed(2),
  };
}

export const removeDecimal = (num: FixedNumber) => num.round(0).toString().split(".")[0];

const padZero = (num: number) => (String(num).length === 1 ? "0" + String(num) : String(num));

/** Convert seconds to days, hours, minutes and seconds */
export function secondsToDays(seconds: number) {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const result = days > 0 ? days + (days == 1 ? " day, " : " days, ") : "";
  return `${result}${padZero(hours)}:${padZero(minutes)}:${padZero(s)}`;
}
