import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useUser } from '@/context/user-context';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AccountScreen() {
  const theme = useTheme();
  const { name, logout } = useUser();

  const isGuest = !name;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.profile}>
        <View style={[styles.avatar, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="person" size={40} color={theme.textSecondary} />
        </View>
        <ThemedText type="subtitle">{name ?? 'Guest'}</ThemedText>
        <ThemedText themeColor="textSecondary">
          {isGuest ? 'You are browsing as a guest' : 'Signed in'}
        </ThemedText>
      </View>

      {/* Logout returns the user to the login screen (handled by the root layout guard). */}
      <Pressable
        onPress={logout}
        style={({ pressed }) => [
          styles.button,
          { borderColor: theme.backgroundSelected },
          pressed && styles.pressed,
        ]}>
        <Ionicons
          name={isGuest ? 'log-in-outline' : 'log-out-outline'}
          size={20}
          color={theme.text}
        />
        <ThemedText style={styles.buttonText}>{isGuest ? 'Login' : 'Logout'}</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.six,
  },
  profile: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.six,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  button: {
    flexDirection: 'row',
    gap: Spacing.two,
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
