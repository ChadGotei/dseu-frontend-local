import { lazy } from "react";
import { Route } from "react-router-dom";
import ExaminationSecond from "./ExaminationSecond";
import ExaminationThird from "./ExaminationThird";

const Examination = lazy(() => import("../Examination/Examination"));
const ExaminationSection = lazy(() => import("../Examination/ExaminationSection"));

export const examinationRoutes = (
    <>
        <Route path="/examination" element={<Examination />} />
        <Route path="/examination-second" element={<ExaminationSecond />} />
        <Route path="/examination-third" element={<ExaminationThird />} />
    </>
);
