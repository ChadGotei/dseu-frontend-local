import { lazy } from "react";
import { Route } from "react-router-dom";

const Examination = lazy(() => import("../Examination/Examination"));
const ExaminationSection = lazy(() => import("../Examination/ExaminationSection"));

export const examinationRoutes = (
    <>
        <Route path="/examination" element={<Examination />} />
        {/* Dynamic section route (datesheet, results, notices, etc.) */}
        <Route path="/examination/:section" element={<ExaminationSection />} />
    </>
);
