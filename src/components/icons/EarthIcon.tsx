import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EarthIconProps {
  width?: number;
  height?: number;
}

export default function EarthIcon({ width = 40, height = 40 }: EarthIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
      <Path 
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" 
        stroke="#000" 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M4 24H44" 
        stroke="#000" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M24 44C29.5228 44 34 35.0457 34 24C34 12.9543 29.5228 4 24 4C18.4772 4 14 12.9543 14 24C14 35.0457 18.4772 44 24 44Z" 
        stroke="#000" 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
    </Svg>
  );
}