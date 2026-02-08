import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginWithEmail, signUpWithEmail, useGoogleAuth } from '@/services/authService';
import { useUserStore } from '@/store/userStore';
import { colors, spacing, typography } from '@/constants/theme';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';

export const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useUserStore();
  const { promptAsync } = useGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          displayName: firebaseUser.displayName ?? 'Listener',
          email: firebaseUser.email ?? ''
        });
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, [setUser]);

  const handleEmailAuth = async () => {
    if (isLogin) {
      await loginWithEmail(email, password);
    } else {
      await signUpWithEmail(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Stream your favorites</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.primaryButton} onPress={handleEmailAuth}>
        <Text style={styles.primaryText}>{isLogin ? 'Login' : 'Create Account'}</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => promptAsync()}>
        <Text style={styles.secondaryText}>Continue with Google</Text>
      </Pressable>
      <Pressable onPress={() => setIsLogin((prev) => !prev)}>
        <Text style={styles.toggleText}>
          {isLogin ? 'New here? Create an account' : 'Already have an account? Login'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    justifyContent: 'center'
  },
  title: {
    color: colors.textPrimary,
    ...typography.title,
    marginBottom: spacing.sm
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.body,
    marginBottom: spacing.lg
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.sm,
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  primaryButton: {
    backgroundColor: colors.accent,
    padding: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  primaryText: {
    color: colors.textPrimary,
    fontWeight: '700'
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  secondaryText: {
    color: colors.textPrimary
  },
  toggleText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm
  }
});
