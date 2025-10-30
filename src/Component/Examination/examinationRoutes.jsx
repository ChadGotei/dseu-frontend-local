import { lazy } from "react";
import { Route } from "react-router-dom";

const Examination = lazy(() => import("../Examination/Examination"));
const ExamNotices = lazy(() => import("./ExamNotices"));
const ExamResults = lazy(() => import("./ExamResults"));
const ExamDatesheet = lazy(() => import("./ExamDatesheet"));

export const examinationRoutes = (
    <Route path="/examination" element={<Examination />} >
        <Route index element={<ExamNotices />} />
        <Route path="notices" element={<ExamNotices />} />
        <Route path="results" element={<ExamResults />} />
        <Route path="datesheet" element={<ExamDatesheet />} />
    </Route>
);
