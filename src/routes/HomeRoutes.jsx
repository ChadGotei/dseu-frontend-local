import { lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("../Component/Home/page.jsx"));
const ChancellorMessage = lazy(() => import("../Component/Body/ChancellorMessage"));
const ViceChancellorMessage = lazy(() => import("../Component/Body/ViceChancellorMessage"));
const SeperateScrollbar = lazy(() => import("../Component/Home/ScrollBarpage.jsx"));

export const homeRoutes = (
  <>
    <Route
      path="/"
      element={
        <>
          <Home />
        </>
      }
    />
    <Route path="/chancellor" element={<ChancellorMessage />} />
    <Route path="/announcements" element={<SeperateScrollbar />} />
    <Route path="/vice-chancellor" element={<ViceChancellorMessage />} />
  </>
);


