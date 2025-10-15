import { lazy } from "react";
import { Route } from "react-router-dom";

const Examination = lazy(() => import("../Examination/Examination"));

export const examinationRoutes = (
    <>
        <Route path="/examination" element={<Examination />} />
    </>
);
