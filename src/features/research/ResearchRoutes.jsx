import { lazy } from "react";
import { Route } from "react-router-dom";

const Research = lazy(() => import("./Page"));

const OfficeBearers = lazy(() => import("./pages/OfficeBearers"));
const Supervisors = lazy(() => import("./pages/Supervisors"));
const PhdStudents = lazy(() => import("./pages/PhdStudents"));
const Ordinance = lazy(() => import("./pages/Ordinance"));
const DoctoralResearchCommittee = lazy(() =>
  import("./pages/DoctoralResearchCommittee")
);
const InformationBrochure = lazy(() =>
  import("./pages/InformationBrochure")
);
const Notices = lazy(() => import("./pages/Notices"));
const AdmissionPortal = lazy(() =>
  import("./pages/AdmissionPortal")
);

export const researchRoutes = (
  <>
    <Route path="/research" element={<Research />} />
    <Route path="/research/office-bearers" element={<OfficeBearers />} />
    <Route path="/research/supervisors" element={<Supervisors />} />
    <Route path="/research/phd-students" element={<PhdStudents />} />
    <Route path="/research/ordinance" element={<Ordinance />} />
    <Route
      path="/research/doctoral-research-committee"
      element={<DoctoralResearchCommittee />}
    />
    <Route
      path="/research/information-brochure"
      element={<InformationBrochure />}
    />
    <Route path="/research/notices" element={<Notices />} />
    <Route path="/research/admission-portal" element={<AdmissionPortal />} />
  </>
);
