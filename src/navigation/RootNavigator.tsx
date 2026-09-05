import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Test1Screen from '../screens/Test1Screen';
import Test2Screen from '../screens/Test2Screen';
import Test3Screen from '../screens/Test3Screen';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export default function RootNavigator() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Please Sign in first');
  }

  const { isLoading, isLoggedIn } = authContext;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Floty Test' }} />
          <RootStack.Screen name="Test1" component={Test1Screen} options={{ title: 'Test 1' }} />
          <RootStack.Screen name="Test2" component={Test2Screen} options={{ title: 'Test 2' }} />
          <RootStack.Screen name="Test3" component={Test3Screen} options={{ title: 'Test 3' }} />
        </RootStack.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="SignIn" component={SignInScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}