import { lazy } from "react";

const HomeBody = lazy(() => import("../Body/Banner"));
const Announcements = lazy(() => import("../Body/Announcements"));
const Message = lazy(() => import("../Body/Message"));
const InformationBulletin = lazy(() =>
  import("../Body/InformationBulletin")
);
const News = lazy(() => import("../Body/News"));
const OurPartners = lazy(() => import("../Body/OurPartners"));
const EventsAndActivities = lazy(() =>
  import("../Body/StudentEvents")
);
const OurCampuses = lazy(() => import("../Body/OurCampuses"));
const Socials = lazy(() => import("../Footer/Socials"));
import StudyProgramsSection from "../Body/StudentProgram";

const page = () => {
  return (
    <>
      <Announcements />
      <HomeBody />
      <Message />
      <Socials />
      <InformationBulletin />
      <OurCampuses />
      <StudyProgramsSection />
      <OurPartners />
      <News />
      <EventsAndActivities />
    </>
  );
};

export default page;
