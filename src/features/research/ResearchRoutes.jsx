import { lazy } from "react";
import { Route } from "react-router-dom";
import UnderConstruction from '../../Component/Reusable/UnderConstruction';

const Research = lazy(() => import("./Page"));

const OfficeBearers = lazy(() => import("./pages/OfficeBearers"));
const Supervisors = lazy(() => import("./pages/Supervisors"));
const PhdStudents = lazy(() => import("./pages/PhdStudents"));
const Ordinance = lazy(() => import("./pages/Ordinance"));
const DoctoralResearchCommittee = lazy(() =>
  import("./pages/DoctoralResearchCommittee")
);
const Notices = lazy(() => import("./pages/Notices"));
const SupervisorsBySlug = lazy(() => import("./components/SupervisorBySlug"));

export const researchRoutes = (
  <>
    <Route path="/research" element={<Research />} />
    <Route path="/research/office-bearers" element={<OfficeBearers />} />
    <Route path="/research/supervisors" element={<Supervisors />} />
    <Route path="/research/phd-students" element={<PhdStudents />} />
    <Route path="/research/ordinance" element={<Ordinance />} />
    <Route
      path="/research/department-research-committee"
      element={<DoctoralResearchCommittee />}
    />
    <Route
      path="/research/information-brochure"
      element={<UnderConstruction />}
    />
    <Route path="/research/notices" element={<Notices />} />
    <Route path="/research/admission-portal" element={<UnderConstruction />} />
    <Route path="/research/supervisor/:slug" element={<SupervisorsBySlug />} />
  </>
);
