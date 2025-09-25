import { lazy } from "react";
import { Route } from "react-router-dom";

const About = lazy(() => import("../Component/NavItems/About"));
const HistoryDSEU = lazy(() => import("../Component/NavItems/HistoryDSEU"));
const VissionMission = lazy(() => import("../Component/NavItems/Vission&Mission"));
const AnnualReport = lazy(() => import("../Component/NavItems/AnnualReport"));
const UnderConstruction = lazy(() => import("../Component/Reusable/UnderConstruction"));

export const aboutRoutes = (
  <>
    <Route path="/about-us/About-the-University" element={<About />} />
    <Route path="/about-us/Vision-and-Mission" element={<VissionMission />} />
    <Route path="/about-us/history" element={<HistoryDSEU />} />
    <Route path="/UGC-Guidelines" element={<UnderConstruction />} />
    <Route path="/about-us/annualReport" element={<AnnualReport />} />
  </>
);


