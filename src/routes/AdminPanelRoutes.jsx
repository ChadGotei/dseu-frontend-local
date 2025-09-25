import { lazy } from "react";
import { Route } from "react-router-dom";

const AdminLogin = lazy(() => import("../Component/Admin/LoginForm"));
const Dashboard = lazy(() => import("../Component/Admin/Dashboard"));
const TestPage = lazy(() => import("../Component/Admin/TestPage"));
const ArchiveUploads = lazy(() => import("../Component/Admin/ArchiveUploads"));
const ViewPdfs = lazy(() => import("../Component/Admin/ViewPDFs/ViewPdfs"));
const AddStudent = lazy(() => import("../Component/Admin/result/AddStudent.jsx"));

export const adminPanelRoutes = (
  <>
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin/uploads" element={<TestPage />} />
    <Route path="/admin/view-pdfs" element={<ViewPdfs />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/archive-uploads" element={<ArchiveUploads />} />
    <Route path="/admin/result/add-student" element={<AddStudent />} />
  </>
);


