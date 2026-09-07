import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { appConfig, formatPrice, getProductById } from '@/data/catalog';
import { useCart } from '@/context/cart-context';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { addToCart } = useCart();

  const product = getProductById(id);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <ThemedText type="subtitle">Product not found</ThemedText>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    // Move to the cart so the user sees the item they just added.
    router.push('/cart');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: product.title }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={200} />
        <View style={styles.body}>
          {product.category ? (
            <ThemedText type="small" themeColor="textSecondary">
              {product.category}
            </ThemedText>
          ) : null}
          <ThemedText type="subtitle">{product.title}</ThemedText>
          <ThemedText style={styles.price}>{formatPrice(product.price)}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.description}>
            {product.description}
          </ThemedText>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.backgroundElement }]}>
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText style={styles.buttonText}>{appConfig.addToCartLabel}</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: Spacing.four,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  body: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: Spacing.two,
  },
  footer: {
    padding: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: '#208AEF',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
