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
import { getCountriesForTimezone } from "countries-and-timezones";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { CURRENCY } from "./constant/currency";
import { LANGUAGE_CODE } from "./constant/languageCode";
import { useTranslation } from "react-i18next";

dayjs.extend(timezone);

const App = () => {
  const { i18n } = useTranslation();
  const { setUser, setAuthType, setUserSetting } = useECommerce();

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

  const getTimeZon = async () => {
    const userTimezone = dayjs?.tz?.guess();
    const countryInfo = await getCountriesForTimezone(userTimezone)[0];
    const country = countryInfo?.name?.toLowerCase();

    const currency = CURRENCY[country] || "$";
    const langCode = LANGUAGE_CODE[country] || "en";
    i18n.changeLanguage(langCode || "en");
    setUserSetting({ currency, langCode, ...countryInfo });
  };

  useEffect(() => {
    getTimeZon();
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
