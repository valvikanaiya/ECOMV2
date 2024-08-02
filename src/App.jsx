import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import Loader from "@components/Loader/Loader";
import { dashboardRoutes, protectedRoutes, publicRoutes } from "./routes";
import axiosInstance from "./utils/axious";
import { api } from "./utils/api";
import { useECommerce } from "./hooks/useECommerce";
import Dashboard from "./components/Dashboard/Dashboard";
import AddToHome from "./components/AddToHome/AddToHome";

const App = () => {
  const { setUser, setAuthType } = useECommerce();

  const userId = 1;
  const getUser = async () => {
    try {
      const result = await axiosInstance.get(`${api.getUser}/${userId}`);
      if (result.status === 200) {
        setUser({ ...result.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.authType) {
      setAuthType(auth.authType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddToHome />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Dashboard />}>
            {dashboardRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          <Route element={<Layout />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
