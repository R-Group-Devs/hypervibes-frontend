import styled from 'styled-components';
import { formatUnits } from '@ethersproject/units';
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
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

const Container = styled.span``;

/**
 * Render a BigNumber, optionally lerped in real time based on a sample time and
 * daily rate
 */
export default ({
  value,
  decimals,
  interpolation,
  minimumFractionDigits,
  maximumFractionDigits,
  ...props
}: Props) => {
  const [alpha, setAlpha] = useState<BigNumber | undefined>();

  useEffect(() => {
    const h = setInterval(update, 100);
    return () => clearInterval(h);
  }, [interpolation]);

  const update = () => {
    if (interpolation == null) {
      setAlpha(BigNumber.from(0));
      return;
    }

    // compute time since sample and amount to add (alpha)
    const delta = Math.max(0, Date.now() - interpolation.sampledAt * 1000);
    const nextAlpha = interpolation.dailyRate
      .mul(delta)
      .div(1000 * 60 * 60 * 24);

    setAlpha(nextAlpha);
  };

  if (value == null) {
    return <>-</>;
  }

  // un-inited state
  if (alpha == null) {
    return null;
  }

  // add alpha to value and clamp to max
  let num = value.add(alpha);
  if (interpolation != null) {
    num = num.gt(interpolation.max) ? interpolation.max : num;
  }

  const truncated = Number(formatUnits(num, decimals)).toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return <Container {...props}>{truncated}</Container>;
};
