import { lazy } from "react";
import { Route } from "react-router-dom";

const CampusPage = lazy(() => import("../Component/Campuses/CampusPage"));
const CampusByZone = lazy(() => import("../Component/Campuses/CampusByZone"));

export const campusRoutes = (
  <>
    <Route path="/campus/:name" element={<CampusPage />} />
    <Route path="/campus/zone/:zone" element={<CampusByZone />} />
  </>
);


