# Todi Creation E-Commerce Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium, high-performance, mobile-first product catalog and WhatsApp-based inquiry website for Todi Creation, a Surat-based manufacturer of designer ethnic wear, featuring a secure lightweight admin panel and robust Supabase integration.

**Architecture:** A Next.js 15 App Router architecture optimized for instant client-side navigation using Next.js 16/15 static prerendering and local Suspense boundaries. The backend runs on Supabase (PostgreSQL + Auth + Storage), with Row Level Security (RLS) policies protecting data access. A unified React State hook manages the shopping bag/inquiries, and GSAP handles luxury animation flows.

**Tech Stack:** Next.js 15/16 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP, Supabase (JS client, SSR, Auth, Postgres DB, Storage), Lucide React.

---

## 1. Database Schema (Postgres)

We will provision the following tables and storage in Supabase:

### `categories` Table
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `name` TEXT NOT NULL
* `slug` TEXT UNIQUE NOT NULL
* `description` TEXT
* `image_url` TEXT
* `created_at` TIMESTAMPTZ DEFAULT now() NOT NULL
* `updated_at` TIMESTAMPTZ DEFAULT now() NOT NULL

### `products` Table
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `title` TEXT NOT NULL
* `slug` TEXT UNIQUE NOT NULL
* `description` TEXT NOT NULL
* `sku` TEXT UNIQUE NOT NULL
* `price` NUMERIC NOT NULL
* `category_id` UUID REFERENCES categories(id) ON DELETE SET NULL
* `fabric` TEXT NOT NULL (e.g. Banarasi, Georgette, Silk Cotton)
* `image_urls` TEXT[] NOT NULL DEFAULT '{}'
* `featured` BOOLEAN DEFAULT false NOT NULL
* `stock` INTEGER DEFAULT 1 NOT NULL (0 = out of stock)
* `created_at` TIMESTAMPTZ DEFAULT now() NOT NULL
* `updated_at` TIMESTAMPTZ DEFAULT now() NOT NULL
* `deleted_at` TIMESTAMPTZ (for soft deletes)

### Storage Bucket
* Name: `product-images`
* Access: Public reading, authenticated user writing

### Row Level Security (RLS) Policies
* **Categories**:
  * Select: Allow public read
  * Insert/Update/Delete: Authenticated admins only
* **Products**:
  * Select: Allow public read where `deleted_at IS NULL`
  * Insert/Update/Delete: Authenticated admins only

---

## 2. Page Hierarchy & Routing

* `(shop)/` - Core customer-facing shop group
  * `page.tsx` - Homepage (Luxury Hero, Featured Categories, Trending Products)
  * `catalog/page.tsx` - Search & filter catalog with interactive drawer
  * `product/[slug]/page.tsx` - Product details page (Prerendered shell, image slider, specs, add to bag, inquiry)
  * `inquiry-bag/page.tsx` - Overview of items added for inquiry & single WhatsApp link generator
* `(auth)/login/page.tsx` - Admin login page (Supabase Email/Password Auth)
* `admin/` - Admin group (middleware protected)
  * `layout.tsx` - Admin layout with sidebar navigation
  * `page.tsx` - Dashboard landing (Total active products, out of stock, pending items)
  * `products/page.tsx` - List of products (Actions: Add, Edit, Delete/Soft-Delete)
  * `products/new/page.tsx` - Product creation page (image upload form)
  * `products/edit/[id]/page.tsx` - Product edit page
  * `categories/page.tsx` - Category management

---

## 3. Style System & Visual Design

We will use Tailwind v4. The visual style is **Luxury Minimalist**:
* **Theme**: Light Mode / Dark Mode support. Deep charcoal `#0f0f10` for luxury dark background; rich ivory `#fbfcfa` for light mode; gold/brass accent `#c5a880` for CTAs and highlights.
* **Typography**: Elegant fonts (Outfit/Playfair Display for headings, Inter for body).
* **Interactions**: Subtle glassmorphism (`backdrop-blur`), smooth fade-ins via GSAP, responsive touch feedback.

---

## Task List

### Task 1: Setup Configuration and Tailwind Styling
**Files:**
* Modify: `src/app/globals.css` (Implement CSS design variables, local font loading, utility classes)
* Modify: `next.config.ts` (Configure Supabase image hostname, activate cacheComponents, add DevTools toggle)

### Task 2: Setup Supabase Database Schema
**Files:**
* Create: `supabase/migrations/20260629000000_schema.sql` (Tables, FKs, Indexes, RLS Policies, Triggers for updated_at)

### Task 3: Supabase Clients and Middleware Setup
**Files:**
* Create: `src/lib/supabase/client.ts` (Client-side Supabase instance)
* Create: `src/lib/supabase/server.ts` (Server-side Supabase client for Server Components)
* Create: `src/lib/supabase/admin-auth.ts` (Auth helpers)
* Create: `src/middleware.ts` (Protect `/admin` paths using Server Session validation)

### Task 4: Base Layout & State Management (Shopping Bag)
**Files:**
* Create: `src/context/BagContext.tsx` (Add, remove, update quantities, persist in localStorage)
* Modify: `src/app/layout.tsx` (Wrap with BagProvider, load Google Fonts, add SEO templates)

### Task 5: SEO Helper and Schema Markup
**Files:**
* Create: `src/components/seo/SEOJsonLd.tsx` (Dynamic JSON-LD generator for Product, Organization, and LocalBusiness)

### Task 6: Homepage Component & Styling (Customer Facing)
**Files:**
* Create: `src/components/ui/LuxuryHero.tsx` (Interactive GSAP hero section with sliding images)
* Modify: `src/app/page.tsx` (Combine LuxuryHero, Category Grid, and Trending products sections)

### Task 7: Product Catalog & Multi-Filters Sheet
**Files:**
* Create: `src/components/ui/FiltersDrawer.tsx` (Mobile-first slide-out filters component)
* Create: `src/app/catalog/page.tsx` (Instant navigation, dynamic product list with grid, search, and ordering)

### Task 8: Product Details View
**Files:**
* Create: `src/components/ui/ImageCarousel.tsx` (Touch-friendly gallery with zoom)
* Create: `src/app/product/[slug]/page.tsx` (Clean layout with `unstable_instant`, static caching, WhatsApp trigger)

### Task 9: Bag Drawer and Inquiry Submission
**Files:**
* Create: `src/components/ui/BagDrawer.tsx` (Responsive slide-out cart panel)
* Create: `src/app/inquiry-bag/page.tsx` (Detailed cart overview, WhatsApp messaging compiler)

### Task 10: Admin Authentication (Login Page)
**Files:**
* Create: `src/app/(auth)/login/page.tsx` (Sleek login UI, auth handlers using Supabase Auth)

### Task 11: Admin Layout & Navigation
**Files:**
* Create: `src/app/admin/layout.tsx` (Responsive side-navigation, mobile hamburger, logout trigger)
* Create: `src/app/admin/page.tsx` (Dashboard summary stats)

### Task 12: Admin Product Management & Soft Delete
**Files:**
* Create: `src/app/admin/products/page.tsx` (Product listing table, pagination, search, quick toggles, delete action)

### Task 13: Image Compression & Supabase Storage Multi-Uploader
**Files:**
* Create: `src/components/admin/ImageUploader.tsx` (Drag-and-drop area, file size validation, compression, upload status)

### Task 14: Create / Edit Product Forms
**Files:**
* Create: `src/app/admin/products/new/page.tsx` (Complete form validation, image integration, category selector)
* Create: `src/app/admin/products/edit/[id]/page.tsx` (Fetch existing product data, pre-populate form, save changes)

### Task 15: Admin Category Management
**Files:**
* Create: `src/app/admin/categories/page.tsx` (Add, list, update categories with inline modals)

### Task 16: Verification & QA Audits
**Files:**
* Create: `src/app/api/health/route.ts` (Quick diagnostic route)
* Perform: Comprehensive manual verification of responsiveness, accessibility, routing, and console logs.

---

## Execution Choice

Plan complete and saved to `docs/plans/2026-06-29-todi-creation-website.md`. Two execution options:

1. **Subagent-Driven (this session)** - I dispatch fresh subagents per task, review between tasks, and achieve fast iterations.
2. **Parallel Session (separate)** - Open a new session with `executing-plans`, batch execution with checkpoints.

Which approach?
