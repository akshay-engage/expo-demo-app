import catalog from './catalog.json';

/**
 * Generic product schema. Field names are intentionally generic so this app can
 * be repurposed (recharge plans, airline tickets, etc.) by only editing
 * `catalog.json` — no screen code needs to change.
 *
 * - `title`       => the main label (product name / plan name / flight route)
 * - `price`       => numeric amount
 * - `image`       => remote image URL
 * - `description` => longer detail text shown on the details screen
 * - `category`    => optional grouping label
 */
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category?: string;
};

export type AppConfig = {
  title: string;
  tagline: string;
  currencySymbol: string;
  listTitle: string;
  addToCartLabel: string;
  checkoutLabel: string;
};

export const appConfig: AppConfig = catalog.app;

export const products: Product[] = catalog.products;

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function formatPrice(amount: number): string {
  return `${appConfig.currencySymbol}${amount.toFixed(2)}`;
}
