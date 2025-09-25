import { lazy } from "react";
import { Route } from "react-router-dom";

const CoursesPage = lazy(() => import("../Component/Courses/CoursesPage"));
const Program = lazy(() => import("../Component/Courses/Program"));
const CoursesByLevel = lazy(() => import("../Component/Courses/CoursesByLevel"));

export const courseRoutes = (
  <>
    <Route path="/courses" element={<CoursesPage />} />
    <Route path="/programs/:id" element={<Program />} />
    <Route path="/courses/:programLevel" element={<CoursesByLevel />} />
  </>
);


