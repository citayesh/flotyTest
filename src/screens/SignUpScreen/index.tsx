import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import CitayeshLogo from '../../components/icons/CitayeshLogo';
import { AuthContext } from '../../context/AuthContext';

export default function SignUpScreen({ route, navigation }: any) {
  const authContext = useContext(AuthContext);
  const { phone } = route.params;
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password.length > 20 || rePassword.length > 20) {
      setError('Password must not exceed 20 characters');
      return;
    }
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const usersJson = await AsyncStorage.getItem('@mock_users');
      let users = usersJson ? JSON.parse(usersJson) : {};

      users[phone] = password;
      await AsyncStorage.setItem('@mock_users', JSON.stringify(users));
      await authContext?.signIn(phone);
    } catch (e) {
      setError('Failed to register');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <CitayeshLogo width={300} height={300} />
      </View>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={(text) => { setPassword(text); setError(''); }}
        maxLength={20}
        style={styles.input}
      />
      <TextInput
        placeholder="Re-enter Password"
        placeholderTextColor="#888"
        value={rePassword}
        onChangeText={(text) => { setRePassword(text); setError(''); }}
        maxLength={20}
        style={styles.input}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Sign Up & Login" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
        <Text style={styles.linkText}>Change Number</Text>
      </TouchableOpacity>
    </View>
  );
}