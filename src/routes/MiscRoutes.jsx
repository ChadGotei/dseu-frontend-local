import { lazy } from "react";
import { Route } from "react-router-dom";

const HolidayCalendar = lazy(() => import("../Component/Calendar/HolidayCalendar"));
const AlumniSection = lazy(() => import("../Component/Alumni Page/AlumniSection"));
const ArchivedJobPortal = lazy(() => import("../Component/Administration/ArchivedJobPortal"));
const GrievanceForm = lazy(() => import("../Component/Grievance/Grievance"));
const Placement = lazy(() => import("../Component/Student Services/Placement"));
const LoginPage = lazy(() => import("../Component/Login/LoginPage"));

export const miscRoutes = (
  <>
    <Route path="/holiday-calendar" element={<HolidayCalendar />} />
    <Route path="/alumni" element={<AlumniSection />} />
    <Route path="/recruitment/archive/:category" element={<ArchivedJobPortal />} />
    <Route path="/grievance-form" element={<GrievanceForm />} />
    <Route path="/placement" element={<Placement />} />
    <Route path="/logindseu" element={<LoginPage />} />
  </>
);


