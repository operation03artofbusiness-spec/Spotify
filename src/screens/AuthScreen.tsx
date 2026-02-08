import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { signInWithEmail, signUpWithEmail } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async () => {
    try {
      const user = isLogin
        ? await signInWithEmail(email.trim(), password)
        : await signUpWithEmail(email.trim(), password);
      setUser(user);
    } catch (error) {
      Alert.alert('Authentication failed', 'Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SpotifyLike</Text>
      <Text style={styles.subtitle}>Stream your favorite tracks anywhere.</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.secondaryText}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </Text>
      </Pressable>

      <View style={styles.divider} />
      <Text style={styles.hint}>Google sign-in is supported via Firebase Auth.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    color: '#B3B3B3',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: {
    color: '#0B0B0B',
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#B3B3B3',
  },
  divider: {
    height: 1,
    backgroundColor: '#1F1F1F',
    marginVertical: 24,
  },
  hint: {
    color: '#8A8A8A',
    textAlign: 'center',
    fontSize: 12,
  },
});
