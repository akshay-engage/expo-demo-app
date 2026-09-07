import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';
import { appConfig } from '@/data/catalog';
import { useTheme } from '@/hooks/use-theme';
import WebEngage from 'react-native-webengage';

export default function LoginScreen() {
  const { login, skip } = useUser();
  const theme = useTheme();
  const [name, setName] = useState('');
  const webEngage = new WebEngage();

  const trimmed = name.trim();

  // Both actions land the user on the home screen. The root layout swaps the
  // navigator to the tabs group as soon as the session becomes "ready", so we
  // just update the context here.
  const handleLogin = () => {
    const userName = trimmed.length > 0 ? trimmed : 'Shopper';
    login(userName);
    webEngage.user.login(userName);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              {appConfig.title}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.tagline}>
              {appConfig.tagline}
            </ThemedText>
          </View>

          <View style={styles.form}>
            <ThemedText type="small" themeColor="textSecondary">
              Your name
            </ThemedText>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="words"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              style={[
                styles.input,
                { backgroundColor: theme.backgroundElement, color: theme.text },
              ]}
            />

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                pressed && styles.pressed,
              ]}>
              <ThemedText style={styles.primaryButtonText}>Login</ThemedText>
            </Pressable>

            <Pressable
              onPress={skip}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                { borderColor: theme.backgroundSelected },
                pressed && styles.pressed,
              ]}>
              <ThemedText style={styles.secondaryButtonText}>Skip login</ThemedText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.six,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 16,
  },
  form: {
    gap: Spacing.three,
  },
  input: {
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
  button: {
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#208AEF',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
