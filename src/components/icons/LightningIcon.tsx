import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LightningIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export default function LightningIcon({ width = 12, height = 12, fill = '#FFF' }: LightningIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l2-8z" />
    </Svg>
  );
}