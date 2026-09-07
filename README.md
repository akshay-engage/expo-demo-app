# Shopping Demo for Expo

A simple shopping demo app built with Expo (SDK 57) and Expo Router.

> **Note:** WebEngage is integrated in this app by following the official Expo guide:
> [https://docs.webengage.com/docs/expo](https://docs.webengage.com/docs/expo)
>
> For **Expo push notifications**, follow the branch: `demo/webengage_expo_push`

## Features

- Login screen (Login with a name, or Skip as Guest) — no real authentication
- Bottom tabs: **Home**, **Cart**, **Account**
- Home: welcome message (shows your name, or a "Guest" badge) + product list
- Product details: image, price, description, and "Add to cart"
- Cart: item list with quantity steppers, total price, and checkout (shows a success alert and clears the cart)
- Account: shows your name and a Login/Logout button
- Products are driven by JSON, so the catalog is easy to change

## Requirements

- Node.js 22.13+
- A Mac with Xcode (for iOS) and/or Android Studio (for Android)

## Steps to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate the native projects:

   ```bash
   npx expo prebuild --clean
   ```

3. Run on a device or emulator:

   ```bash
   npx expo run:android
   ```

   ```bash
   npx expo run:ios
   ```

### Troubleshooting

- **"Cannot connect to Expo CLI" on an Android emulator** (URL like `10.0.2.2:8081`): make sure the Metro dev server is running (`npx expo start`), then forward the port:

  ```bash
  adb reverse tcp:8081 tcp:8081
  ```

- The Ionicons font is bundled into the app (via `useFonts` and the `expo-font` config plugin), so icons work without downloading assets at runtime. If you change the font setup, re-run `npx expo prebuild --clean`.

## Changing the Catalog

All content lives in one file: `src/data/catalog.json`.

- `app` — title, tagline, currency symbol, and button labels
- `products` — the list of items shown in the app

Each product uses generic fields, so you can repurpose the app (recharge, airline booking, etc.) by editing this file:

```json
{
  "id": "p1",
  "title": "Wireless Headphones",
  "price": 129.99,
  "image": "https://example.com/image.jpg",
  "description": "Short product description.",
  "category": "Audio"
}
```

## Project Structure

```
src/
  app/
    _layout.tsx          # Root layout + providers + login/tabs routing
    login.tsx            # Login / Skip screen
    (tabs)/
      _layout.tsx        # Bottom tab bar
      index.tsx          # Home
      cart.tsx           # Cart
      account.tsx        # Account
    product/[id].tsx     # Product details
  context/               # User + Cart state (React Context)
  data/                  # catalog.json + typed accessor
  components/            # Shared UI (product card, themed text/view)
```

## WebEngage Integration

WebEngage was integrated by following the official Expo guide:
[https://docs.webengage.com/docs/expo](https://docs.webengage.com/docs/expo)

- For **Expo push notifications**, follow the branch: `demo/webengage_expo_push`
- The License Code and environment are configured through the WebEngage Expo config plugin in `app.json`. Replace the License Code with your own before building.
- After changing any WebEngage config in `app.json`, regenerate the native projects with `npx expo prebuild --clean`.

## Notes

- Login and cart state are kept in memory only, so they reset when the app restarts.

## Useful Links

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
