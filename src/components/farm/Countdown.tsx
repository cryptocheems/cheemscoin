import { Heading, HeadingProps } from "@chakra-ui/react";
import { BigNumber } from "@ethersproject/bignumber";
import { useState, useEffect } from "react";
import { now, secondsToDays } from "../../utils";

interface CountdownProps extends HeadingProps {
  text: string;
  endTime: BigNumber;
  adjustDays?: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  text,
  endTime,
  adjustDays = 0,
  ...props
}) => {
  // https://stackoverflow.com/a/66044632/13837629
  const [currentTime, setCurrentTime] = useState(now());
  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(now()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <Heading {...props}>{`${text}: ${secondsToDays(
      endTime.toNumber() - currentTime - adjustDays * 24 * 3600
    )}`}</Heading>
  );
};
