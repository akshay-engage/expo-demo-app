import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { appConfig, formatPrice } from '@/data/catalog';
import { useCart, type CartItem } from '@/context/cart-context';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function CartScreen() {
  const theme = useTheme();
  const { items, total, increment, decrement, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert('Order placed', 'Your order was placed successfully!', [
      { text: 'OK', onPress: clearCart },
    ]);
  };

  if (items.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.background }]}>
        <Ionicons name="cart-outline" size={64} color={theme.textSecondary} />
        <ThemedText type="subtitle">Your cart is empty</ThemedText>
        <ThemedText themeColor="textSecondary">Add some products to get started.</ThemedText>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.item, { backgroundColor: theme.backgroundElement }]}>
      <Image source={{ uri: item.product.image }} style={styles.thumb} contentFit="cover" />
      <View style={styles.itemInfo}>
        <ThemedText type="smallBold" numberOfLines={1}>
          {item.product.title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          {formatPrice(item.product.price)} each
        </ThemedText>

        <View style={styles.qtyRow}>
          <Pressable
            onPress={() => decrement(item.product.id)}
            hitSlop={8}
            style={[styles.qtyButton, { backgroundColor: theme.backgroundSelected }]}>
            <Ionicons name="remove" size={16} color={theme.text} />
          </Pressable>
          <ThemedText type="smallBold" style={styles.qtyValue}>
            {item.quantity}
          </ThemedText>
          <Pressable
            onPress={() => increment(item.product.id)}
            hitSlop={8}
            style={[styles.qtyButton, { backgroundColor: theme.backgroundSelected }]}>
            <Ionicons name="add" size={16} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.itemRight}>
        <ThemedText type="smallBold">
          {formatPrice(item.product.price * item.quantity)}
        </ThemedText>
        <Pressable onPress={() => removeFromCart(item.product.id)} hitSlop={8}>
          <Ionicons name="trash-outline" size={20} color={theme.textSecondary} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={[styles.footer, { borderTopColor: theme.backgroundElement }]}>
        <View style={styles.totalRow}>
          <ThemedText type="smallBold">Total</ThemedText>
          <ThemedText type="subtitle" style={styles.totalValue}>
            {formatPrice(total)}
          </ThemedText>
        </View>
        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [styles.checkoutButton, pressed && styles.pressed]}>
          <ThemedText style={styles.checkoutText}>{appConfig.checkoutLabel}</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  item: {
    flexDirection: 'row',
    borderRadius: Spacing.three,
    padding: Spacing.two,
    gap: Spacing.three,
    alignItems: 'center',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: Spacing.two,
  },
  itemInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    minWidth: 20,
    textAlign: 'center',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: Spacing.one,
  },
  footer: {
    padding: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.three,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalValue: {
    fontSize: 24,
    lineHeight: 30,
  },
  checkoutButton: {
    backgroundColor: '#208AEF',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
