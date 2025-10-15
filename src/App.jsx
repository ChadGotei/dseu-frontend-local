import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Loader from "./Component/PageLoader/Loader";
import NotFound from "./Component/NotFound/page.jsx";
import UserLayout from "./Component/Layouts/UserLayout.jsx";
import { resultRoutes } from "./routes/ResultRoutes.jsx";
import { homeRoutes } from "./routes/HomeRoutes.jsx";
import { campusRoutes } from "./routes/CampusRoutes.jsx";
import { courseRoutes } from "./routes/CourseRoutes.jsx";
import { academicRoutes } from "./routes/AcademicRoutes.jsx";
import { administrationRoutes } from "./routes/AdministrationRoutes.jsx";
import { aboutRoutes } from "./routes/AboutRoutes.jsx";
import { admissionRoutes } from "./routes/AdmissionRoutes.jsx";
import { miscRoutes } from "./routes/MiscRoutes.jsx";
import { workWithUsRoutes } from "./routes/WorkWithUsRoutes.jsx";
import { amenitiesRoutes } from "./routes/AmenitiesRoutes.jsx";
import { otherRoutes } from "./routes/OtherRoutes.jsx";
import { researchRoutes } from "./features/research/ResearchRoutes.jsx";
import { adminPanelRoutes } from "./features/admin/AdminRoutes.jsx";
import { examinationRoutes } from "./Component/Examination/examinationRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>
        {/* User Routes */}
        <Routes>
          <Route element={<UserLayout />}>
            {homeRoutes}
            {campusRoutes}
            {courseRoutes}
            {academicRoutes}
            {administrationRoutes}
            {aboutRoutes}
            {admissionRoutes}
            {miscRoutes}
            {workWithUsRoutes}
            {amenitiesRoutes}
            {adminPanelRoutes}
            {resultRoutes}
            {otherRoutes}
            {examinationRoutes}
            {researchRoutes}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
