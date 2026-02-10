# Серёжкин дом - Premium Website

A premium business card website and small online store for "Серёжкин дом" brand, featuring handcrafted wooden wall clocks.

## Features

- **Premium Design**: Minimal, elegant design with white and WhatsApp green color scheme
- **Light/Dark Theme**: Theme toggle with localStorage persistence
- **Fully Responsive**: Mobile-first design that works on all devices
- **E-commerce Features**: Product catalog, filters, search, cart, and checkout
- **No Backend Required**: All data stored in localStorage

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Vue Router** for navigation

## Pages

- `/` - Home page with hero, brand description, benefits, and featured products
- `/catalog` - Product catalog with search, filters (category, price, manufacturer, stock), and sorting
- `/product/:id` - Product detail page with gallery, specs, and add to cart
- `/about` - About the brand
- `/delivery` - Payment and delivery information (payment by invoice only)
- `/warranty` - Warranty and service information
- `/contacts` - Contact information with form and map placeholder
- `/cart` - Shopping cart with localStorage persistence
- `/checkout` - Checkout form with success message

## Products

The store includes 14 mock products (wall clocks) with Russian names:
- Домовой Лесовичок
- Самовар
- Кот-моряк
- Айболит
- Березовая роща
- Матрёшка
- Медведь в лесу
- Теремок
- Жар-птица
- Рябина
- Золотая рыбка
- Колобок
- Богатырь
- Снегурочка

All products are around 2400₽ and include detailed descriptions and specifications.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

## Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Features Overview

### Theme Toggle
- Light and dark mode support
- Persisted in localStorage
- Smooth transitions between themes

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart using localStorage
- Cart count badge in header
- Total price calculation

### Product Catalog
- Search by product name
- Filter by category
- Filter by manufacturer
- Filter by price range
- Filter by stock availability
- Sort by price or name
- Responsive grid layout

### Checkout Process
- Customer information form
- Delivery method selection (Russian Post, SDEK, or pickup)
- Order summary
- Success message with order number
- Invoice sent to email (mock implementation)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   ├── ProductCard.vue
│   └── ThemeToggle.vue
├── composables/         # Vue composables
│   ├── useCart.ts      # Cart management
│   └── useTheme.ts     # Theme management
├── data/               # Mock data
│   └── products.ts     # Product data
├── router/             # Vue Router configuration
│   └── index.ts
├── views/              # Page components
│   ├── About.vue
│   ├── Cart.vue
│   ├── Catalog.vue
│   ├── Checkout.vue
│   ├── Contacts.vue
│   ├── Delivery.vue
│   ├── Home.vue
│   ├── Product.vue
│   └── Warranty.vue
├── App.vue             # Root component
├── main.ts             # Application entry point
└── style.css           # Global styles with Tailwind
```

## Color Scheme

- **Primary Color**: WhatsApp Green (#25D366)
- **Background Light**: White (#FFFFFF)
- **Background Dark**: Gray-900 (#111827)
- **Text Light**: Gray-900 (#111827)
- **Text Dark**: Gray-100 (#F3F4F6)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All product images use placeholder URLs
- Contact form submissions are mock implementations
- Payment processing is simulated (invoice by email)
- No real backend or API integration
