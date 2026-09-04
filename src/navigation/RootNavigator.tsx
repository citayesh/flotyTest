import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import Test1Screen from '../screens/Test1Screen';
import Test2Screen from '../screens/Test2Screen';
import Test3Screen from '../screens/Test3Screen';

export type RootStackParamList = {
  Home: undefined;
  Test1: undefined;
  Test2: undefined;
  Test3: undefined;
};

export type AuthStackParamList = {
  SignIn: { onLogin: () => void };
  SignUp: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function RootNavigator() {
  // Manage authentication state here
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Floty Test' }} />
          <RootStack.Screen name="Test1" component={Test1Screen} options={{ title: 'Test 1' }} />
          <RootStack.Screen name="Test2" component={Test2Screen} options={{ title: 'Test 2' }} />
          <RootStack.Screen name="Test3" component={Test3Screen} options={{ title: 'Test 3' }} />
        </RootStack.Navigator>
      ) : (null
        /*
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen 
            name="SignIn" 
            component={SignInScreen} 
            initialParams={{ onLogin: handleLogin }} 
          />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>*/
      )}
    </NavigationContainer>
  );
}