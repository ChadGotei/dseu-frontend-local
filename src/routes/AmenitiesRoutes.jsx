import { lazy } from "react";
import { Route } from "react-router-dom";

const Ncc = lazy(() => import("../Component/Student Services/Ncc"));
const Sports = lazy(() => import("../Component/Student Services/Sports"));
const Library = lazy(() => import("../Component/Student Services/Library"));
const EqualOpportunity = lazy(() => import("../Component/Student Services/EqualOpportunity"));
const ICC = lazy(() => import("../Component/Student Services/ICC"));
const AntiRagging = lazy(() => import("../Component/Student Services/AntiRagging"));
const Scholarship = lazy(() => import("../Component/Student Services/Scholarship"));

export const amenitiesRoutes = (
  <>
    <Route path="/ncc" element={<Ncc />} />
    <Route path="/amenities/Sports" element={<Sports />} />
    <Route path="/amenities/Library" element={<Library />} />
    <Route path="/amenities/Equal-Opportunity" element={<EqualOpportunity />} />
    <Route path="/amenities/ICC" element={<ICC />} />
    <Route path="/amenities/Anti-Ragging" element={<AntiRagging />} />
    <Route path="/amenities/Scholarship" element={<Scholarship />} />
  </>
);


