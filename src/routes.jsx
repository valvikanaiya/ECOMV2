/* eslint-disable */
import { lazy } from "react";

const Products = lazy(() => import("@pages/Products/Products"));
const ViewProduct = lazy(() => import("@pages/ViewProduct/ViewProduct"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Profile = lazy(() => import("@pages/Profile/Profile"));
const Admin = lazy(() => import("@pages/Admin/Admin"));

export const dashboardRoutes = [
  { path: "/dashboard", element: <Admin /> },
  { path: "/dashboard/products", element: <Admin /> },
  { path: "/dashboard/products/:id", element: <ViewProduct /> },
];

export const protectedRoutes = [
  { path: "/", element: <Products /> },
  { path: "/product", element: <Products /> },
  { path: "/:categories", element: <Products /> },
  { path: "/product/:id", element: <ViewProduct /> },
  { path: "/cart", element: <Cart /> },
  { path: "/profile", element: <Profile /> },
];

export const publicRoutes = [{ path: "/login", element: <Products /> }];
