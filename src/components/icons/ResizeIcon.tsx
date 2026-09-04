import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ResizeIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function ResizeIcon({ width = 16, height = 16, stroke = '#FFF' }: ResizeIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
      <Path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M21 16v3a2 2 0 01-2 2h-3" />
    </Svg>
  );
}