// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home' as never);
      })
      .catch((error: Error) => {
        console.error('Login error:', error);
      });
  };


  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Navigate to Home Screen
        navigation.navigate('Home' as never);
      })
      .catch((error: Error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={register} />
    </View>
  );
};

export default LoginScreen;
