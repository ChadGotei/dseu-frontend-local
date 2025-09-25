import { lazy } from "react";
import { Route } from "react-router-dom";

const Entrepreneurship = lazy(() => import("../Component/NavItems/Entrepreneurship"));
const Tenders = lazy(() => import("../Component/Tenders/Tenders.jsx"));

export const otherRoutes = (
  <>
    <Route path="/Entrepreneurship" element={<Entrepreneurship />} />
    <Route path="/tenders" element={<Tenders />} />
  </>
);


