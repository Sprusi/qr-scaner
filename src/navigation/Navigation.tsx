import { Navigate, Route, Routes } from "react-router-dom";
import { QrCodeGenerator } from "../components/genarate/QrCodeGenerator";
import { QrHistory } from "../components/qr-history/QrHistory";
import { QrCodeScanner } from "../components/scan/QrCodeScanner";
import { NotFound } from "../components/not-found/NotFound";
import { BaseLayout } from "../layout/BaseLayout";
import {
  LOCAL_GENERATE_DATA_KEY,
  LOCAL_SCAN_DATA_KEY,
} from "../constants/localStorageKeys";

export default function Navigation() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/generate" element={<QrCodeGenerator />} />
        <Route
          path="/generate-history"
          element={<QrHistory storyKey={LOCAL_GENERATE_DATA_KEY} />}
        />
        <Route path="/scan" element={<QrCodeScanner />} />
        <Route
          path="/scan-history"
          element={<QrHistory storyKey={LOCAL_SCAN_DATA_KEY} />}
        />
      </Route>
      <Route path="/" element={<Navigate replace to={"/generate"} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
