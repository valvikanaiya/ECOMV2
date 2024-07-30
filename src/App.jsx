import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import { Dashboard } from "@mui/icons-material";
import Loader from "@components/Loader/Loader";
import { dashboardRoutes, protectedRoutes, publicRoutes } from "./routes";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route element={<Dashboard />}>
          {dashboardRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
