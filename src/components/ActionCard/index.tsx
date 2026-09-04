import { Pressable, Text } from 'react-native';
import { styles } from './styles';

interface ActionCardProps {
  title: string;
  onPress: () => void;
}

// Ensure { title, onPress } are inside the curly braces here
export default function ActionCard({ title, onPress }: ActionCardProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.7 }
      ]} 
      onPress={onPress}
    >
      {/* Ensure {title} is rendered inside the Text component */}
      <Text style={styles.cardText}>{title}</Text>
    </Pressable>
  );
}