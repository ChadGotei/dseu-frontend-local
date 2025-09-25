import { lazy } from "react";
import { Route } from "react-router-dom";

const ListOfFaculties = lazy(() => import("../Component/Body/ListOfFaculties"));
const AcademicCalendar = lazy(() => import("../Component/Calendar/AcademicCalendar"));
const FacultyById = lazy(() => import("../Component/Department/FacultyById"));
const AcademicRegulation = lazy(() => import("../Component/AcademicRegulation/page"));
const AcademicCollabration = lazy(() => import("../Component/Academics/AcademicCollaboration"));
const AcademicAdministration = lazy(() => import("../Component/Academics/AcademicAdministration"));
const IQAC = lazy(() => import("../Component/Academics/IQAC"));
const DepartmentById = lazy(() => import("../Component/Department/DepartmentById"));

export const academicRoutes = (
  <>
    <Route path="/academics/faculty" element={<ListOfFaculties />} />
    <Route path="/academics/regulations" element={<AcademicRegulation />} />
    <Route path="/dept/:id" element={<DepartmentById />} />
    <Route path="/academics/collaboration" element={<AcademicCollabration />} />
    <Route path="/academics/IQAC" element={<IQAC />} />
    <Route path="/academics/academic-calendar" element={<AcademicCalendar />} />
    <Route path="/academics/academicAdministration" element={<AcademicAdministration />} />
    <Route path="/faculty/:id" element={<FacultyById />} />
  </>
);


