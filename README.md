# dekord Frontend - Customer Website

This is the customer-facing e-commerce website for dekord, built with Next.js 15.

## Features

- 🏠 **Home Page** - Hero section, product previews, brand story
- 🛍️ **Product Catalog** - Browse all products with filters
- 📦 **Product Details** - Detailed product pages with specs, images, and purchase options
- 🛒 **Shopping Cart** - Add/remove items, apply promo codes
- 💳 **Checkout** - Complete order form with Pakistani provinces
- 📝 **Blog** - Brand stories and product launches
- 📞 **Contact** - Contact form and company information
- 📄 **Legal Pages** - Privacy policy, terms, refund/return policies

## Tech Stack

- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Package Manager:** pnpm

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
frontend/
├── app/                    # App Router pages
│   ├── page.tsx           # Home page
│   ├── catalog/           # Product catalog
│   ├── product/           # Product details
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── [legal pages]/     # Privacy, terms, policies
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── product/          # Product-specific components
│   └── [feature components]
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
│   └── images/          # Product images
└── styles/              # Global styles
```

## Key Features

### Design
- Grain texture background pattern
- Minimal color palette (black, white, neutrals)
- Smooth animations and transitions
- Mobile-responsive layout

### Products
- dekord W-60 (60W USB-C Cable)
- dekord W-100 (100W USB-C Cable - coming soon)
- 1-year warranty
- 30-day return policy

### Shipping
- Flat rate: Rs. 200
- Delivery: 3-5 business days
- Nationwide coverage in Pakistan

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

The frontend can be deployed to Vercel, Netlify, or any platform supporting Next.js.

## Git Repository

This project is version controlled with Git. The `.git` folder is located in the frontend directory.
