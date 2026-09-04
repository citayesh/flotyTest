import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator'; 
import ActionCard from '../../components/ActionCard';
import { styles } from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ActionCard title="Test 1" onPress={() => navigation.navigate('Test1')} />
      <ActionCard title="Test 2" onPress={() => navigation.navigate('Test2')} />
      <ActionCard title="Test 3" onPress={() => navigation.navigate('Test3')} />
    </View>
  );
}