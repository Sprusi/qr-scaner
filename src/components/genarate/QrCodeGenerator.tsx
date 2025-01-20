import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button, Flex, message, QRCode, Space, Typography } from "antd";
import { InterfaceLabels } from "../../constants";
import { LOCAL_GENERATE_DATA_KEY } from "../../constants/LocalStorageKeys";
import { useTitle } from "../../utils/useTitle";
import { useLocalStorage } from "../../utils/useLocalStorage";
import styles from "./qrCodeGenerator.module.css";

export const QrCodeGenerator = () => {
  useTitle(InterfaceLabels.QR_GEN_TITLE);
  const [localHistory, setLocalHistory] = useLocalStorage(
    LOCAL_GENERATE_DATA_KEY
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [inputText, setInputText] = useState("");
  const [generageMessage, setGenerageMessage] = useState("");

  const handleGenerate = () => {
    if (!inputText)
      return messageApi.warning(InterfaceLabels.QR_GEN_GENERATE_ERROR_MESSAGE);
    setGenerageMessage(inputText);
    setInputText("");
    localHistory
      ? setLocalHistory([inputText, ...localHistory])
      : setLocalHistory([inputText]);
  };

  return (
    <Flex justify="center" className={styles.wrapper}>
      {contextHolder}
      <Space direction="vertical" size={"large"} align={"center"}>
        <TextArea
          className={styles.input}
          size="large"
          placeholder={InterfaceLabels.QR_GEN_INPUT_PLACEHOLDER}
          maxLength={400}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          color="default"
          variant="solid"
          size="large"
          onClick={handleGenerate}
        >
          {InterfaceLabels.QR_GEN_GENERATE_BUTTON}
        </Button>
        {generageMessage && (
          <Space
            className={styles.qrCodeWrapper}
            direction="vertical"
            align={"center"}
          >
            <Typography.Title level={4}>{generageMessage}</Typography.Title>
            <QRCode value={generageMessage} />
          </Space>
        )}
      </Space>
    </Flex>
  );
};
