import { lazy } from "react";
import { Route } from "react-router-dom";

const AdministrationTemp = lazy(() => import("../Component/Administration/page"));
const ChancellorPage = lazy(() => import("../Component/Administration/ChancellorPage"));
const ViceChancellorPage = lazy(() => import("../Component/Body/ViceChancellorPage"));
const RegistararPage = lazy(() => import("../Component/Body/RegistararPage"));
const COE = lazy(() => import("../Component/Administration/COE"));
const COF = lazy(() => import("../Component/Administration/COF"));
const UnderConstruction = lazy(() => import("../Component/Reusable/UnderConstruction"));

export const administrationRoutes = (
  <>
    <Route path="/administration/administrative/*" element={<AdministrationTemp />} />
    <Route path="/administration/Support-Services" element={<UnderConstruction />} />
    <Route path="/administration/Other-Academic-Units" element={<UnderConstruction />} />
    <Route path="/registrar" element={<RegistararPage />} />
    <Route path="/administration/vice-chancellor" element={<ViceChancellorPage />} />
    <Route path="/administration/chancellor" element={<ChancellorPage />} />
    <Route path="/administration/coe" element={<COE />} />
    <Route path="/administration/cof" element={<COF />} />
  </>
);


