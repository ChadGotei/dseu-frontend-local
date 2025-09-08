import { lazy } from "react";
import { Route } from "react-router-dom";

// lazy imports…
const Result = lazy(() => import("../Component/Result/Result.jsx"));
const ShowResult = lazy(() => import("../Component/Result/ShowResult.jsx"));
const UGResult = lazy(() => import("../Component/Result/UG/UgResult.jsx"));
const ShowUgResult = lazy(() => import("../Component/Result/UG/ShowUgResult.jsx"));
const PGResult = lazy(() => import("../Component/Result/PG/PgResult.jsx"));
const ShowPgResult = lazy(() => import("../Component/Result/PG/ShowPgResult.jsx"));
const DiplomaRound2Result = lazy(() => import("../Component/Result/Diploma_round2/DiplomaRound2Result.jsx"));
const ShowDiplomaRound2 = lazy(() => import("../Component/Result/Diploma_round2/ShowDiplomaRound2.jsx"));
const BtechRound2Result = lazy(() => import("../Component/Result/Btech_round2/BtechRound2Result.jsx"));
const ShowBtechRound2 = lazy(() => import("../Component/Result/Btech_round2/ShowBtechRound2.jsx"));
const UGRound2Result = lazy(() => import("../Component/Result/Ug_round2/UgRound2Result.jsx"));
const ShowUgRound2 = lazy(() => import("../Component/Result/Ug_round2/ShowUgRound2.jsx"));
const DiplomaRound3Result = lazy(() => import("../Component/Result/Diploma_round3/DiplomaRound3Result.jsx"));
const ShowDiplomaRound3 = lazy(() => import("../Component/Result/Diploma_round3/ShowDiplomaRound3.jsx"));
const DiplomaRound4Result = lazy(() => import("../Component/Result/Diploma_round4/DiplomaRound4Result.jsx"));
const ShowDiplomaRound4 = lazy(() => import("../Component/Result/Diploma_round4/ShowDiplomaRound4.jsx"));

export const resultRoutes = (
  <>
    <Route path="/admission/result" element={<Result />} />
    <Route path="/admission/result/show" element={<ShowResult />} />

    <Route path="/admission/result/ug" element={<UGResult />} />
    <Route path="/admission/result/ug/show" element={<ShowUgResult />} />

    <Route path="/admission/result/pg" element={<PGResult />} />
    <Route path="/admission/result/pg/show" element={<ShowPgResult />} />

    <Route path="/admission/result/diploma/round2" element={<DiplomaRound2Result />} />
    <Route path="/admission/result/diploma2/show" element={<ShowDiplomaRound2 />} />

    <Route path="/admission/result/diploma/round3" element={<DiplomaRound3Result />} />
    <Route path="/admission/result/diploma3/show" element={<ShowDiplomaRound3 />} />

    <Route path="/admission/result/diploma/round4" element={<DiplomaRound4Result />} />
    <Route path="/admission/result/diploma4/show" element={<ShowDiplomaRound4 />} />

    <Route path="/admission/result/btech/round2" element={<BtechRound2Result />} />
    <Route path="/admission/result/btech2/show" element={<ShowBtechRound2 />} />

    <Route path="/admission/result/ug/round2" element={<UGRound2Result />} />
    <Route path="/admission/result/ug2/show" element={<ShowUgRound2 />} />
  </>
);
