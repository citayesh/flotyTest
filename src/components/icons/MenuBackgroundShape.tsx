// src/components/svgs/MenuBackgroundShape.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MenuBackgroundShape() {
  return (
    <Svg width="60" height="330" viewBox="400 150 200 650" preserveAspectRatio="none" fill="none">
      <Path 
        d="M692.3283 777.8179L493.2789 603.7225L493.2789 371.5953L692.3283 197.4999Z" 
        fill="#000" 
        stroke="#000" 
        strokeWidth="15" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
      <Path 
        d="M590.3036 681.8349L480.5822 565.3293L480.5822 409.9885L590.3036 293.4829Z" 
        fill="#000" 
        stroke="#000" 
        strokeWidth="25" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
    </Svg>
  );
}