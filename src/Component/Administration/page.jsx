import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BoardOfManagement from "./BoardOfManagement";
import ImportantForms from "./ImportantForms";
import AdvisoryBoard from "./AdvisoryBoard";
import EmployeePolicy from "./EmployeePolicy";
import StatutoryBodies from "./StatutoryBodies";
import TeamDseu from "./TeamDseu";
import OfficeOrders from "./OfficeOrders";
import Circulars from "./Circulars";
import Statutes from "./Statutes";

import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";

const AdministrationTemp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/administration/administrative") {
      navigate("/administration/administrative/board-of-management", {
        replace: true,
      });
    }
  }, []);

  return (
    <div className="flex flex-col my-1 sm:my-4 md:my-10 lg:flex-row gap-6">
      <SideBar />
      <MobileSideBar />
      <div className="flex-1 px-10">
        <Routes>
          <Route path="board-of-management" element={<BoardOfManagement />} />
          <Route path="important-forms" element={<ImportantForms />} />
          <Route path="advisory-board" element={<AdvisoryBoard />} />
          <Route path="employee-policy" element={<EmployeePolicy />} />
          <Route path="statutory-bodies" element={<StatutoryBodies />} />
          <Route path="team-dseu" element={<TeamDseu />} />
          <Route path="office-orders" element={<OfficeOrders />} />
          <Route path="circulars" element={<Circulars />} />
          <Route path="statutes" element={<Statutes />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdministrationTemp;
