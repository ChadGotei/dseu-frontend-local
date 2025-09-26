import { lazy } from "react";
import { Route } from "react-router-dom";

const AdminLogin = lazy(() => import("./LoginForm.jsx"));
const Dashboard = lazy(() => import("./Dashboard.jsx"));
const TestPage = lazy(() => import("./TestPage.jsx"));
const ArchiveUploads = lazy(() => import("./ArchiveUploads.jsx"));
const ViewPdfs = lazy(() => import("./ViewPDFs/ViewPdfs.jsx"));
const AddStudent = lazy(() => import("./result/AddStudent.jsx"));

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


