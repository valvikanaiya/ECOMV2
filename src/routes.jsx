/* eslint-disable */
import { lazy } from "react";

const Products = lazy(() => import("@pages/Products/Products"));
const ViewProduct = lazy(() => import("@pages/ViewProduct/ViewProduct"));
const Cart = lazy(() => import("@pages/Cart/Cart"));

export const dashboardRoutes = [{ path: "/dashboard", element: <Products /> }];

export const protectedRoutes = [
  { path: "/", element: <Products /> },
  { path: "/:categories", element: <Products /> },
  { path: "/product/:id", element: <ViewProduct /> },
  { path: "/cart", element: <Cart /> },
];

export const publicRoutes = [{ path: "/login", element: <Products /> }];
