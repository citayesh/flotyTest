import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function WeightUpIcon({ width = 12, height = 12, color = '#898789' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5L19 15H5L12 5Z" fill={color} />
    </Svg>
  );
}