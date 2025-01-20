import { FC } from "react";
import { Button, Empty, Flex, QRCode, Space, Typography } from "antd";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { InterfaceLabels } from "../../constants";
import styles from "./qrHistory.module.css";
import { handleUrlClick } from "../../utils/utils";

interface QrHistoryProps {
  storyKey: string;
}

export const QrHistory: FC<QrHistoryProps> = ({ storyKey }) => {
  const [storageHistory, setStorageHistory] = useLocalStorage(storyKey);
  const data = storageHistory || [];

  const handleClearHistory = () => setStorageHistory([]);

  const renderItems = (data: string[]) =>
    data.length ? (
      data.map((el, i) => (
        <Space direction="vertical" align="center" key={`${i}-${el}`}>
          <Typography.Title
            level={5}
            className={styles.link}
            onClick={() => handleUrlClick(el)}
          >
            {el}
          </Typography.Title>
          <QRCode value={el} />
        </Space>
      ))
    ) : (
      <Empty />
    );

  return (
    <Flex gap={"large"} vertical align="center" className={styles.wrapper}>
      {!!data.length && (
        <Button
          color="default"
          variant="solid"
          size="large"
          onClick={handleClearHistory}
        >
          {InterfaceLabels.QR_HIS_CLEAR_HISTORY_BTN}
        </Button>
      )}
      {renderItems(data)}
    </Flex>
  );
};
