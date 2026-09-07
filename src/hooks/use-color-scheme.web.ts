import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * `useSyncExternalStore` returns the server snapshot ('light') during SSR/first paint and the
 * client snapshot (true) after hydration, without calling setState inside an effect.
 */
function subscribe() {
  // Hydration state never changes after the first client render, so there is
  // nothing to subscribe to.
  return () => {};
}

export function useColorScheme() {
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
