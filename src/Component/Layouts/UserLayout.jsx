import { Outlet } from "react-router-dom";
// import ChatWidget from "../chatbot";
import Footer from "../Footer/Footer";
import ResponsiveHeader from "../Header/MidNavbar";
import { DesktopNav } from "../Admin/AdminNavBar";
import DesktopNavBar from "../Header/BottomNavbar";



const UserLayout = () => (
  <>
    <ResponsiveHeader />
    
    <Outlet />
    {/* <ChatWidget /> */}
    <Footer />
  </>
);

export default UserLayout;
