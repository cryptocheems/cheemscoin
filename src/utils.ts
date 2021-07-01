/** Get current time in seconds */
export const now = () => Math.round(Date.now() / 1000);

// TODO: This is probably wrong, fix it
export const calcMultiplier = (duration: string) => (Number(duration) * (5 / 180) + 1).toFixed(2);
