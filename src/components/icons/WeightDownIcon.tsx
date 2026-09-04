import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function WeightDownIcon({ width = 12, height = 12, color = '#898789' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M12 19L5 9H19L12 19Z" fill={color} />
    </Svg>
  );
}