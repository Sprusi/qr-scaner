import { useState } from "react";
import {
  IDetectedBarcode,
  IScannerComponents,
  IScannerStyles,
  Scanner,
} from "@yudiel/react-qr-scanner";

import styles from "./qrCodeScanner.module.css";
import { LOCAL_SCAN_DATA_KEY } from "../../constants/localStorageKeys";
import { Flex, Typography } from "antd";

export const QrCodeScanner = () => {
  const [scanned, setScanned] = useState("");

  const handleScan = (result: IDetectedBarcode[]) => {
    const resultValue = result?.[0]?.rawValue || "";
    setScanned(resultValue);

    const localHistory = JSON.parse(
      localStorage.getItem(LOCAL_SCAN_DATA_KEY) || "[]"
    );
    localStorage.setItem(
      LOCAL_SCAN_DATA_KEY,
      JSON.stringify([resultValue, ...localHistory])
    );
  };

  const scannerSettings: IScannerComponents = { audio: false, finder: false };
  const scannerStyles: IScannerStyles = {
    container: { width: 300 },
  };

  return (
    <Flex
      align="center"
      justify="center"
      gap={"large"}
      vertical
      className={styles.wrapper}
    >
      <Scanner
        onScan={handleScan}
        allowMultiple
        components={scannerSettings}
        styles={scannerStyles}
      />
      {scanned && (
        <Typography.Title level={4} className={styles.result}>
          {scanned}
        </Typography.Title>
      )}
    </Flex>
  );
};
