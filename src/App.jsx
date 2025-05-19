import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Loader from "./Component/PageLoader/Loader";
import UnderConstruction from "./Component/Reusable/UnderConstruction";
import StudyProgramsSection from "./Component/Body/StudentProgram";
import GrievanceForm from "./Component/Grievance/Grievance";
import IndustryPartnership from "./Component/News/news1";
import LoginPage from "./Component/Login/LoginPage";
import AcademicRegulation from "./Component/AcademicRegulation/page";

// admission
import AdmissionGuidelines from "./Component/Admission/AdmissionGuidelines";
import FeeRefundPolicy from "./Component/Admission/FeeRefundPolicy";
import ProcessAndGuidelines from "./Component/Admission/ProcessAndGuidelines";

// Academics
import AcademicCollabration from "./Component/Academics/AcademicCollaboration";
import AcademicAdministration from './Component/Academics/AcademicAdministration';
const AcademicCalendar = lazy(() => import("./Component/Calendar/AcademicCalendar"));
import IQAC from "./Component/Academics/IQAC";

// Lazy Load Components
const HomeBody = lazy(() => import("./Component/Body/Banner"));
const Announcements = lazy(() => import("./Component/Body/Announcements"));
const Message = lazy(() => import("./Component/Body/Message"));
const ChancellorMessage = lazy(() => import("./Component/Body/ChancellorMessage"));
const ViceChancellorMessage = lazy(() => import("./Component/Body/ViceChancellorMessage"));
const InformationBulletin = lazy(() => import("./Component/Body/InformationBulletin"));

const News = lazy(() => import("./Component/Body/News"));
const OurPartners = lazy(() => import("./Component/Body/OurPartners"));
const EventsAndActivities = lazy(() => import("./Component/Body/StudentEvents"));

// Campuses
const OurCampuses = lazy(() => import("./Component/Body/OurCampuses"));
const CampusPage = lazy(() => import("./Component/Campuses/CampusPage"));
const CampusByZone = lazy(() => import('./Component/Campuses/CampusByZone'));

// Courses
const CoursesPage = lazy(() => import("./Component/Courses/CoursesPage"));
const CourseStructure = lazy(() => import("./Component/Courses/CourseStructure"));
const Curriculum = lazy(() => import("./Component/Courses/Curriculum"));
const Program = lazy(() => import("./Component/Courses/Program"));
const CoursesByLevel = lazy(() => import("./Component/Courses/CoursesByLevel"));

// Academic & Faculty
const ListOfFaculties = lazy(() => import("./Component/Body/ListOfFaculties"));
const DepartmentById = lazy(() => import("./Component/Department/DepartmentById"));

// Administration
const ViceChancellorPage = lazy(() => import('./Component/Body/ViceChancellorPage'));

// Other Sections
const About = lazy(() => import("./Component/NavItems/About"));
const VissionMission = lazy(() => import("./Component/NavItems/Vission&Mission"));
const Amenities = lazy(() => import("./Component/NavItems/Amenities"));
const ResearchDev = lazy(() => import("./Component/Body/ResearchDev"));
const AlumniSection = lazy(() => import("./Component/Alumni Page/AlumniSection"));
const JobPortal = lazy(() => import("./Component/Body/JobPortal"));
const HolidayCalendar = lazy(() => import("./Component/Calendar/HolidayCalendar"));


// Student Services
const Ncc = lazy(() => import("./Component/Student Services/Ncc"));
const Placement = lazy(() => import("./Component/Student Services/Placement"));
const Canteen = lazy(() => import("./Component/Student Services/Canteen"));
const Library = lazy(() => import("./Component/Student Services/Library"));
const Sports = lazy(() => import("./Component/Student Services/Sports"));
const ComputerCentre = lazy(() => import("./Component/Student Services/ComputerCentre"));
const HealthFacilities = lazy(() => import("./Component/Student Services/HealthFacilities"));
const EqualOpportunity = lazy(() => import("./Component/Student Services/EqualOpportunity"));
const ICC = lazy(() => import("./Component/Student Services/ICC"));
const AntiRagging = lazy(() => import("./Component/Student Services/AntiRagging"));

// Admins
const AdminLogin = lazy(() => import('./Component/Admin/LoginForm'));
const Dashboard = lazy(() => import('./Component/Admin/Dashboard'));
const TestPage = lazy(() => import('./Component/Admin/TestPage'));

import RegistararPage from "./Component/Body/RegistararPage";
import Socials from "./Component/Footer/Socials";
import NotFound from "./Component/NotFound/page";
import UserLayout from "./Component/Layouts/UserLayout";
import FacultyById from "./Component/Department/FacultyById";
import HistoryDSEU from "./Component/NavItems/HistoryDSEU";
import Scholarship from "./Component/Student Services/Scholarship";
import ArchiveUploads from "./Component/Admin/ArchiveUploads";
import ArchivedJobPortal from "./Component/Administration/ArchivedJobPortal";
import ChancellorPage from "./Component/Administration/ChancellorPage";
import Entrepreneurship from './Component/NavItems/Entrepreneurship';
import RecruitmentRules from "./Component/Administration/RecruitmentRules";
import AnnualReport from "./Component/NavItems/AnnualReport";
import AdministrationTemp from "./Component/Administration/page";
import ViewPdfs from "./Component/Admin/ViewPDFs/ViewPdfs";
import Tenders from "./Component/Tenders/Tenders.jsx";
import COE from './Component/Administration/COE';
import COF from './Component/Administration/COF';
import Infoadmission from "./Component/Admission/InformationBulletin.jsx";

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
                  <HomeBody />
                  <Announcements />
                  <Message />
                  <Socials />
                  <InformationBulletin />
                  <OurCampuses />
                  <StudyProgramsSection />
                  <OurPartners />
                  <News />
                  <EventsAndActivities />
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
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/courses/:programLevel" element={<CoursesByLevel />} />
            <Route path="/course-structure/:programCode" element={<CourseStructure />} />

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
            <Route path="/research/*" element={<ResearchDev />} />
            <Route path="/administration/vice-chancellor" element={<ViceChancellorPage />} />
            <Route path="/administration/chancellor" element={<ChancellorPage />} />
            <Route path="/administration/coe" element={<COE />} />
            <Route path="/administration/cof" element={<COF />} />

            {/* About us */}
            <Route path="/about-us/About-the-University" element={<About />} />
            <Route path="/about-us/Vision-and-Mission" element={<VissionMission />} />
            <Route path="/information-bulletin" element={<Infoadmission />} />
            <Route path="/about-us/history" element={<HistoryDSEU />} />
            <Route path="/UGC-Guidelines" element={<UnderConstruction />} />
            <Route path="/about-us/annualReport" element={<AnnualReport/>} />

            {/* News */}
            <Route path="/news/achievement" element={<IndustryPartnership />} />
            <Route path="/news/partnership" element={<IndustryPartnership />} />
            <Route path="/news/outreach" element={<IndustryPartnership />} />
            <Route path="/news/innovation-hub" element={<IndustryPartnership />} />

            {/* Admission */}
            <Route path="/admission/guidelines" element={<AdmissionGuidelines />} />
            <Route path="/admission/refund-policy" element={<FeeRefundPolicy />} />
            <Route path="/admission/process-and-guidelines" element={<ProcessAndGuidelines />} />
            <Route path="/admission/information-admission" element={<Infoadmission/>} />

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
            <Route path="/amenities/Facilities" element={<Amenities />} />
            <Route path="/amenities/Computer-Centre" element={<ComputerCentre />} />
            <Route path="/amenities/Canteen" element={<Canteen />} />
            <Route path="/amenities/Sports" element={<Sports />} />
            <Route path="/amenities/Library" element={<Library />} />
            <Route path="/amenities/Health-Facilities" element={<HealthFacilities />} />
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
