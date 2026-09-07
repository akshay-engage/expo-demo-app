import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { ProductCard } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { appConfig, products, type Product } from '@/data/catalog';
import { useUser } from '@/context/user-context';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { name } = useUser();

  const openProduct = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          {name ? (
            <ThemedText type="subtitle">Welcome, {name}</ThemedText>
          ) : (
            <View style={styles.guestRow}>
              <ThemedText type="subtitle">Welcome, </ThemedText>
              <View style={styles.guestBadge}>
                <ThemedText style={styles.guestBadgeText}>Guest</ThemedText>
              </View>
            </View>
          )}
          <ThemedText type="small" themeColor="textSecondary">
            {appConfig.listTitle}
          </ThemedText>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ProductCard product={item} onPress={() => openProduct(item)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  guestBadge: {
    backgroundColor: '#F5A623',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  guestBadgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 20,
  },
  row: {
    gap: Spacing.three,
  },
  cardWrapper: {
    flex: 1,
  },
});
