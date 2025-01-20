import { useState } from "react";
import {
  IDetectedBarcode,
  IScannerComponents,
  IScannerStyles,
  Scanner,
} from "@yudiel/react-qr-scanner";

import styles from "./qrCodeScanner.module.css";
import { LOCAL_SCAN_DATA_KEY } from "../../constants/LocalStorageKeys";
import { Flex, Typography } from "antd";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const QrCodeScanner = () => {
  const [localHistory, setLocalHistory] = useLocalStorage(LOCAL_SCAN_DATA_KEY);
  const [scanned, setScanned] = useState("");

  const handleScan = (result: IDetectedBarcode[]) => {
    const resultValue = result?.[0]?.rawValue || "";
    if (localHistory?.length && resultValue === localHistory[0]) return;

    setScanned(resultValue);
    localHistory
      ? setLocalHistory([resultValue, ...localHistory])
      : setLocalHistory([resultValue]);
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
