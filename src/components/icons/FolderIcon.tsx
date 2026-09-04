import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FolderIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export default function FolderIcon({ width = 18, height = 18, stroke = '#FFF' }: FolderIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
      <Path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </Svg>
  );
}