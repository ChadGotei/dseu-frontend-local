import { lazy } from "react";
import { Route } from "react-router-dom";

const RecruitmentRules = lazy(() => import("../Component/Administration/RecruitmentRules"));
const JobPortal = lazy(() => import("../Component/Body/JobPortal"));

export const workWithUsRoutes = (
  <>
    <Route path="recruitment-rules" element={<RecruitmentRules />} />
    <Route path="/recruitment" element={<JobPortal />} />
  </>
);


