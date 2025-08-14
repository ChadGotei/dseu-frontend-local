import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Loader from "./Component/PageLoader/Loader";
import NotFound from './Component/NotFound/page.jsx';
import UserLayout from './Component/Layouts/UserLayout.jsx';
import UnderConstruction from "./Component/Reusable/UnderConstruction";
import Home from './Component/Home/page.jsx';

// Home page components
const ChancellorMessage = lazy(() => import("./Component/Body/ChancellorMessage"));
const ViceChancellorMessage = lazy(() => import("./Component/Body/ViceChancellorMessage"));

// About us
const About = lazy(() => import("./Component/NavItems/About"));
const HistoryDSEU = lazy(() => import("./Component/NavItems/HistoryDSEU"));
const VissionMission = lazy(() => import("./Component/NavItems/Vission&Mission"));
const AnnualReport = lazy(() => import("./Component/NavItems/AnnualReport"));

// Academics
const ListOfFaculties = lazy(() => import("./Component/Body/ListOfFaculties"));
const AcademicCalendar = lazy(() => import("./Component/Calendar/AcademicCalendar"));
const FacultyById = lazy(() => import("./Component/Department/FacultyById"));
const AcademicRegulation = lazy(() => import("./Component/AcademicRegulation/page"));
const AcademicCollabration = lazy(() => import("./Component/Academics/AcademicCollaboration"));
const AcademicAdministration = lazy(() => import("./Component/Academics/AcademicAdministration"));
const IQAC = lazy(() => import("./Component/Academics/IQAC"));
const Library = lazy(() => import("./Component/Student Services/Library"));
const DepartmentById = lazy(() => import("./Component/Department/DepartmentById"));

// Campuses
const CampusPage = lazy(() => import("./Component/Campuses/CampusPage"));
const CampusByZone = lazy(() => import('./Component/Campuses/CampusByZone'));

// Admission
const AdmissionPage = lazy(() => import("./Component/Admission/AdmissionPage.jsx"));
const IB = lazy(() => import("./Component/Admission/IB.jsx"));
const AdmissionGuidelines = lazy(() => import("./Component/Admission/AdmissionGuidelines"));
const FeeRefundPolicy = lazy(() => import("./Component/Admission/FeeRefundPolicy"));
const ProcessAndGuidelines = lazy(() => import("./Component/Admission/ProcessAndGuidelines"));

// Administrative
const AdministrationTemp = lazy(() => import("./Component/Administration/page"));
const ChancellorPage = lazy(() => import("./Component/Administration/ChancellorPage"));
const ViceChancellorPage = lazy(() => import('./Component/Body/ViceChancellorPage'));
const RegistararPage = lazy(() => import("./Component/Body/RegistararPage"));
const COE = lazy(() => import('./Component/Administration/COE'));
const COF = lazy(() => import('./Component/Administration/COF'));
const RecruitmentRules = lazy(() => import("./Component/Administration/RecruitmentRules"));

// Student Services
const Ncc = lazy(() => import("./Component/Student Services/Ncc"));
const Sports = lazy(() => import("./Component/Student Services/Sports"));
const ICC = lazy(() => import("./Component/Student Services/ICC"));
const AntiRagging = lazy(() => import("./Component/Student Services/AntiRagging"));
const Scholarship = lazy(() => import("./Component/Student Services/Scholarship"));
const EqualOpportunity = lazy(() => import("./Component/Student Services/EqualOpportunity"));

// T&P Cell
const Placement = lazy(() => import("./Component/Student Services/Placement"));

// Job portal
const JobPortal = lazy(() => import("./Component/Body/JobPortal"));
const ArchivedJobPortal = lazy(() => import("./Component/Administration/ArchivedJobPortal"));

// Enterpreneurship
const Entrepreneurship = lazy(() => import('./Component/NavItems/Entrepreneurship'));

// Top bar
const GrievanceForm = lazy(() => import("./Component/Grievance/Grievance"));
const LoginPage = lazy(() => import("./Component/Login/LoginPage"));
const Tenders = lazy(() => import("./Component/Tenders/Tenders.jsx"));
const AlumniSection = lazy(() => import("./Component/Alumni Page/AlumniSection"));

// Courses
const CoursesPage = lazy(() => import("./Component/Courses/CoursesPage"));
const Program = lazy(() => import("./Component/Courses/Program"));
const CoursesByLevel = lazy(() => import("./Component/Courses/CoursesByLevel"));

// Other Sections
const HolidayCalendar = lazy(() => import("./Component/Calendar/HolidayCalendar"));

// Admins
const AdminLogin = lazy(() => import('./Component/Admin/LoginForm'));
const Dashboard = lazy(() => import('./Component/Admin/Dashboard'));
const TestPage = lazy(() => import('./Component/Admin/TestPage'));
const ArchiveUploads = lazy(() => import("./Component/Admin/ArchiveUploads"));
const ViewPdfs = lazy(() => import("./Component/Admin/ViewPDFs/ViewPdfs"));

// result
const Result = lazy(() => import("./Component/Result/Result.jsx"));
const ShowResult = lazy(() => import("./Component/Result/ShowResult.jsx"));
const UGResult = lazy(() => import("./Component/Result/UG/UgResult.jsx"));
const ShowUgResult = lazy(() => import("./Component/Result/UG/ShowUgResult.jsx"));
const PGResult = lazy(() => import("./Component/Result/PG/PgResult.jsx"));
const ShowPgResult = lazy(() => import("./Component/Result/PG/ShowPgResult.jsx"));

const DiplomaRound2Result = lazy(() => import("./Component/Result/Diploma_round2/DiplomaRound2Result.jsx"));
const ShowDiplomaRound2 = lazy(() => import("./Component/Result/Diploma_round2/ShowDiplomaRound2.jsx"));

const BtechRound2Result = lazy(() => import("./Component/Result/Btech_round2/BtechRound2Result.jsx"));
const ShowBtechRound2 = lazy(() => import("./Component/Result/Btech_round2/ShowBtechRound2.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>

        {/* User Routes */}
        <Routes>
          <Route element={<UserLayout />}>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />

            <Route path="/chancellor" element={<ChancellorMessage />} />
            <Route path="/vice-chancellor" element={<ViceChancellorMessage />} />

            {/* Campuses */}
            <Route path="/campus/:name" element={<CampusPage />} />
            <Route path="/campus/zone/:zone" element={<CampusByZone />} />

            {/* Courses */}
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/programs/:id" element={<Program />} />
            <Route path="/courses/:programLevel" element={<CoursesByLevel />} />

            {/* Academics */}
            <Route path="/academics/faculty" element={<ListOfFaculties />} />
            <Route path="/academics/regulations" element={<AcademicRegulation />} />
            <Route path="/dept/:id" element={<DepartmentById />} />
            <Route path="/logindseu" element={<LoginPage />} />
            <Route path="/academics/collaboration" element={<AcademicCollabration />} />
            <Route path="/academics/IQAC" element={<IQAC />} />
            <Route path="/academics/academic-calendar" element={<AcademicCalendar />} />
            <Route path="/academics/academicAdministration" element={<AcademicAdministration />} />
            <Route path="/faculty/:id" element={<FacultyById />} />

            {/* Administration */}
            <Route path="/administration/administrative/*" element={<AdministrationTemp />} />
            <Route path="/administration/Support-Services" element={<UnderConstruction />} />
            <Route path="/administration/Other-Academic-Units" element={<UnderConstruction />} />
            <Route path="/registrar" element={<RegistararPage />} />
            <Route path="/administration/vice-chancellor" element={<ViceChancellorPage />} />
            <Route path="/administration/chancellor" element={<ChancellorPage />} />
            <Route path="/administration/coe" element={<COE />} />
            <Route path="/administration/cof" element={<COF />} />

            {/* About us */}
            <Route path="/about-us/About-the-University" element={<About />} />
            <Route path="/about-us/Vision-and-Mission" element={<VissionMission />} />
            <Route path="/about-us/history" element={<HistoryDSEU />} />
            <Route path="/UGC-Guidelines" element={<UnderConstruction />} />
            <Route path="/about-us/annualReport" element={<AnnualReport />} />


            {/* Admission */}
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/admission/guidelines" element={<AdmissionGuidelines />} />
            <Route path="/admission/refund-policy" element={<FeeRefundPolicy />} />
            <Route path="/admission/process-and-guidelines" element={<ProcessAndGuidelines />} />
            <Route path="/admission/information-bulletin" element={<IB />} />

            {/* Misc */}
            <Route path="/holiday-calendar" element={<HolidayCalendar />} />
            <Route path="/alumni" element={<AlumniSection />} />
            <Route path="/recruitment/archive/:category" element={<ArchivedJobPortal />} />
            <Route path="/grievance-form" element={<GrievanceForm />} />
            <Route path="/placement" element={<Placement />} />

            {/* Work with us */}
            <Route path="recruitment-rules" element={<RecruitmentRules />} />
            <Route path="/recruitment" element={<JobPortal />} />

            {/* Amenities */}
            <Route path="/ncc" element={<Ncc />} />
            <Route path="/amenities/Sports" element={<Sports />} />
            <Route path="/amenities/Library" element={<Library />} />
            <Route path="/amenities/Equal-Opportunity" element={<EqualOpportunity />} />
            <Route path="/amenities/ICC" element={<ICC />} />
            <Route path="/amenities/Anti-Ragging" element={<AntiRagging />} />
            <Route path="/amenities/Scholarship" element={<Scholarship />} />

            {/* Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/uploads" element={<TestPage />} />
            <Route path="/admin/view-pdfs" element={<ViewPdfs />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/archive-uploads" element={<ArchiveUploads />} />

            {/* Result */}
            <Route path="/admission/result" element={<Result />} />
            <Route path="/admission/result/show" element={<ShowResult />} />
            <Route path="/admission/result/ug" element={<UGResult />} />
            <Route path="/admission/result/ug/show" element={<ShowUgResult />} />
            
            <Route path="/admission/result/pg" element={<PGResult />} />
            <Route path="/admission/result/pg/show" element={<ShowPgResult />} />

            <Route path="/admission/result/diploma/round2" element={<DiplomaRound2Result />} />
            <Route path="/admission/result/diploma2/show" element={<ShowDiplomaRound2 />} />

            {/* <Route path="/admission/result/btech/round2" element={<BtechRound2Result />} />
            <Route path="/admission/result/btech2/show" element={<ShowBtechRound2 />} /> */}
 
            {/* Others */}
            <Route path="/Entrepreneurship" element={<Entrepreneurship />} />
            <Route path="/tenders" element={<Tenders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
