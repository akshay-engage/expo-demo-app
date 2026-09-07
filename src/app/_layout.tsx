import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartProvider } from '@/context/cart-context';
import { UserProvider, useUser } from '@/context/user-context';

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
