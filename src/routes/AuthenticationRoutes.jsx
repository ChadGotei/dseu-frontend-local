import { lazy } from "react";
import { Route } from "react-router-dom";

const LoginPage = lazy(() => import("../Component/Login/LoginPage"));

export const authenticationRoutes = (
  <>
    <Route path="/logindseu" element={<LoginPage />} />
  </>
);


