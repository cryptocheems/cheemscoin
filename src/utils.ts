import { calcYield } from "./components/farm/TYield";
import { PoolDetails } from "./types";

/** Get current time in seconds */
export const now = () => Math.round(Date.now() / 1000);

// TODO: This is probably wrong, fix it
const calcMultiplierNum = (duration: string) => Number(duration) * (5 / 180) + 1;
export const calcMultiplier = (duration: string) => calcMultiplierNum(duration).toFixed(2);

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
