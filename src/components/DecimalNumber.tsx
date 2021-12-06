import { commify, formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

interface Props {
  value: BigNumber | null | undefined;
  decimals: number;
  precision?: number;
  interpolation?: {
    sampledAt: number;
    dailyRate: BigNumber;
    max: BigNumber;
  };
}

/**
 * Render a BigNumber, optionally lerped in real time based on a sample time and
 * daily rate
 */
export default ({ value, decimals, interpolation }: Props) => {
  const [alpha, setAlpha] = useState(BigNumber.from(0));

  useEffect(() => {
    const h = setInterval(update, 100);
    return () => clearInterval(h);
  }, [interpolation]);

  const update = () => {
    if (interpolation == null) return;

    // compute time since sample and amount to add (alpha)
    const delta = Math.max(0, Date.now() - interpolation.sampledAt * 1000);
    const nextAlpha = interpolation.dailyRate
      .mul(delta)
      .div(1000 * 60 * 60 * 24);

    setAlpha(nextAlpha);
  };

  if (value == null) {
    return '-';
  }

  // add alpha to value and clamp to max
  let num = value.add(alpha);
  if (interpolation != null) {
    num = num.gt(interpolation.max) ? interpolation.max : num;
  }

  return commify(formatUnits(num, decimals));
};
