import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import { Dashboard } from "@mui/icons-material";
import Loader from "@components/Loader/Loader";
import { dashboardRoutes, protectedRoutes, publicRoutes } from "./routes";
import axiosInstance from "./utils/axious";
import { api } from "./utils/api";
import { useECommerce } from "./hooks/useECommerce";

const App = () => {
  const { setUser } = useECommerce();

  const userId = 1;
  const getUser = async () => {
    try {
      const result = await axiosInstance.get(`${api.getUser}/${userId}`);
      if (result.status === 200) {
        setUser(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
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
