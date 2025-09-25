import { lazy } from "react";
import { Route } from "react-router-dom";

const AdmissionPage = lazy(() => import("../Component/Admission/AdmissionPage.jsx"));
const IB = lazy(() => import("../Component/Admission/IB.jsx"));
const AdmissionGuidelines = lazy(() => import("../Component/Admission/AdmissionGuidelines"));
const FeeRefundPolicy = lazy(() => import("../Component/Admission/FeeRefundPolicy"));
const ProcessAndGuidelines = lazy(() => import("../Component/Admission/ProcessAndGuidelines"));
const ExtendedBulletin = lazy(() => import("../Component/Information Bulletin/ExtendedBulletin.jsx"));

export const admissionRoutes = (
  <>
    <Route path="/admission" element={<AdmissionPage />} />
    <Route path="/admission/guidelines" element={<AdmissionGuidelines />} />
    <Route path="/admission/refund-policy" element={<FeeRefundPolicy />} />
    <Route path="/admission/process-and-guidelines" element={<ProcessAndGuidelines />} />
    <Route path="/admission/information-bulletin" element={<IB />} />
    <Route path="/informationbulletin" element={<ExtendedBulletin />} />
  </>
);


