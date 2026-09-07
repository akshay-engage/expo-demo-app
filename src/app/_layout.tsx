import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartProvider } from '@/context/cart-context';
import { UserProvider, useUser } from '@/context/user-context';
import { usePushNotifications, requestPushPermission } from '@/hooks/use-push-notifications';

function RootNavigator() {
  const { isReady } = useUser();

  return (
    <Stack>
      {/* Login is shown until the user logs in or skips. */}
      <Stack.Protected guard={!isReady}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Main app (tabs + product details) is available once ready. */}
      <Stack.Protected guard={isReady}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Details' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Bundle the icon font so it loads from the app itself instead of being
  // downloaded from the Metro dev server at runtime. This avoids
  // "ExpoAsset.downloadAsync ... Ionicons.ttf" failures when the device can't
  // reach the CLI. Hold rendering until the font is ready.
  const [fontsLoaded] = useFonts(Ionicons.font);

  // Set up push notifications for both iOS and Android
  usePushNotifications();

  // Request push notification permission on app start
  requestPushPermission();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <CartProvider>
          <AnimatedSplashOverlay />
          <RootNavigator />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
