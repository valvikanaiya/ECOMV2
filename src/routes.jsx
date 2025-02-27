/* eslint-disable */
import { lazy } from "react";

const Products = lazy(() => import("@pages/Products/Products"));
const ViewProduct = lazy(() => import("@pages/ViewProduct/ViewProduct"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Profile = lazy(() => import("@pages/Profile/Profile"));
const Admin = lazy(() => import("@pages/Admin/Admin"));
const UpdateProduct = lazy(() => import("@pages/UpdateProduct/UpdateProduct"));
const NotFound = lazy(() => import("@pages/NotFound/NotFound"));
const Orders = lazy(() => import("@pages/Orders/Orders"));
const Customers = lazy(() => import("@pages/Customers/Customers"));
const Login = lazy(() => import("@pages/Login/Login"));

export const dashboardRoutes = [
  { path: "/dashboard", element: <Admin /> },
  { path: "/dashboard/orders", element: <Orders /> },
  { path: "/dashboard/users", element: <Customers /> },
  { path: "/dashboard/products", element: <Admin /> },
  { path: "/dashboard/products/:id", element: <ViewProduct /> },
  { path: "/dashboard/products/:id/update", element: <UpdateProduct /> },
];

export const protectedRoutes = [
  { path: "/", element: <Products /> },
  { path: "/product", element: <Products /> },
  { path: "/products/:categories", element: <Products /> },
  { path: "/product/:id", element: <ViewProduct /> },
  { path: "/cart", element: <Cart /> },
  { path: "/profile", element: <Profile /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/*", element: <NotFound /> },
];
