/* eslint-disable react/react-in-jsx-scope */
import { lazy, Suspense, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import { Route, Routes } from "react-router-dom";
import LoadingPage from "../components/common/loading/loading-page";
import LoadingBrand from "../components/common/loading/loading=brand";
import Global from "../constant/global";
import { RouteNames } from "../constant/routes";
import { authProtectedRoutes, publicRoutes } from "./all-routes";
import { AuthProtected } from "./auth-protected";

const _404Page = lazy(() => import("../pages/_404"));

const Index = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(Global.SOCKET_URL);
  }, []);

  const socket = socketRef.current;

  return (
    <Routes>
      <Route element={<AuthProtected />}>
        {authProtectedRoutes.map((route, idx) => {
          const fallbackComponent = [
            RouteNames.HOME,
            RouteNames.MESSAGE_PAGE,
          ].includes(route.path) ? (
            <LoadingBrand />
          ) : (
            <LoadingPage />
          );

          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={fallbackComponent}>
                  <route.component socket={route.isSocket ? socket : null} />
                </Suspense>
              }
            />
          );
        })}
      </Route>

      {publicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <Suspense fallback={<LoadingPage />}>
              <route.component />
            </Suspense>
          }
        />
      ))}

      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingPage />}>
            <_404Page />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Index;
