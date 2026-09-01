
  (main)/                       ── THE USER SIDE ──
    layout.tsx                  CartProvider + header + cart sheet
    _components/header.tsx      logo, search, cart badge, user menu
    _features/cart-sheet.tsx    lives in the layout, open on every user page
    page.tsx                    home  →  /
      _features/category-tabs.tsx
      _features/food-grid.tsx
      _components/food-card.tsx
    checkout/
      page.tsx                        →  /checkout
      _features/address-form.tsx
      _features/order-summary.tsx
    orders/
      page.tsx                        →  /orders
      _features/order-list.tsx
      _components/order-card.tsx

  admin/                        ── THE ADMIN SIDE ──
    layout.tsx                  role guard + sidebar. NO CartProvider.
    _components/sidebar.tsx     Orders · Dishes · Categories
    orders/
      page.tsx                        →  /admin/orders
      _features/orders-table.tsx
      _components/status-select.tsx
    dishes/
      page.tsx                        →  /admin/dishes
      _features/category-sidebar.tsx
      _features/dish-grid.tsx
      _features/dish-form-dialog.tsx

components/ui/          shadcn only, never edited by hand
components/shared/       used by TWO OR MORE pages — and not before
                         (status-badge lands here on day 12, food-card on day 17)
providers/               auth-provider.tsx, cart-provider.tsx
lib/                     types.ts, format.ts, api.ts (written on connect days)