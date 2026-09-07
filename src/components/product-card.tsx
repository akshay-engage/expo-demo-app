import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { formatPrice, type Product } from '@/data/catalog';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.info}>
        {product.category ? (
          <ThemedText type="small" themeColor="textSecondary">
            {product.category}
          </ThemedText>
        ) : null}
        <ThemedText type="smallBold" numberOfLines={2}>
          {product.title}
        </ThemedText>
        <ThemedText style={styles.price}>{formatPrice(product.price)}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: Spacing.three,
    gap: Spacing.half,
  },
  price: {
    fontWeight: '700',
    marginTop: Spacing.one,
  },
});
