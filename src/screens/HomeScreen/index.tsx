import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import ActionCard from '../../components/ActionCard';
import { styles } from './styles';

export type RootStackParamList = {
  Home: undefined;
  Test1: undefined;
  Test2: undefined;
  Test3: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    await authContext?.signOut();
  };

  return (
    <View style={styles.container}>
      <ActionCard title="Test 1" onPress={() => navigation.navigate('Test1')} />
      <ActionCard title="Test 2" onPress={() => navigation.navigate('Test2')} />
      <ActionCard title="Test 3" onPress={() => navigation.navigate('Test3')} />
      
      <View style={styles.logout}>
        <Button title="Log Out" color="#ff5c5c" onPress={handleLogout} />
      </View>
    </View>
  );
}