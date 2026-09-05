import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import CitayeshLogo from '../../components/icons/CitayeshLogo';
import EyeOpenIcon from '../../components/icons/EyeOpenIcon';
import EyeClosedIcon from '../../components/icons/EyeClosedIcon';
import { AuthContext } from '../../context/AuthContext';

export default function SignInScreen({ navigation }: any) {
  const authContext = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'phone' | 'password'>('phone');
  const [error, setError] = useState('');

  const handleCheckPhone = async () => {
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be 11 digits and start with 0');
      return;
    }
    setError('');

    try {
      const usersJson = await AsyncStorage.getItem('@mock_users');
      const users = usersJson ? JSON.parse(usersJson) : {};

      if (users[phone]) {
        setStep('password');
      } else {
        navigation.navigate('SignUp', { phone });
      }
    } catch (e) {
      setError('Something went wrong');
    }
  };

  const handleSignIn = async () => {
    if (password.length > 20) {
      setError('Password must not exceed 20 characters');
      return;
    }
    setError('');

    try {
      const usersJson = await AsyncStorage.getItem('@mock_users');
      const users = usersJson ? JSON.parse(usersJson) : {};

      if (users[phone] === password) {
        await authContext?.signIn(phone);
      } else {
        setError('Incorrect password');
      }
    } catch (e) {
      setError('Sign in failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <CitayeshLogo width={350} height={350} />
      </View>

      {step === 'phone' ? (
        <>
          <TextInput
            placeholder="Enter Phone Number"
            placeholderTextColor="#888"
            value={phone}
            onChangeText={(text) => { setPhone(text); setError(''); }}
            keyboardType="phone-pad"
            maxLength={11}
            style={styles.input}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Next" onPress={handleCheckPhone} />
        </>
      ) : (
        <>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => { setPassword(text); setError(''); }}
              secureTextEntry={!showPassword}
              maxLength={20}
              style={styles.passwordInput}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)} 
              style={styles.eyeIconContainer}
            >
              {showPassword ? <EyeOpenIcon width={22} height={22} /> : <EyeClosedIcon width={22} height={22} />}
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Sign In" onPress={handleSignIn} />
          
          <TouchableOpacity onPress={() => { setStep('phone'); setPassword(''); setError(''); }} style={styles.linkContainer}>
            <Text style={styles.linkText}>Change Number</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}