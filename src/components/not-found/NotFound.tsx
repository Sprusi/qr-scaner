import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { InterfaceLabels } from "../../constants";
import { useTitle } from "../../utils/useTitle";
import styles from "./notFound.module.css";

export const NotFound = () => {
  useTitle(InterfaceLabels.TITLE_PREFIX);
  const navigate = useNavigate();
  return (
    <Flex justify="center" align="center" className={styles.wrapper}>
      <Result
        status="404"
        title="404"
        subTitle={InterfaceLabels.NFOUND_PAGE_NOT_EXIST}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {InterfaceLabels.NFOUND_GO_TO_HOME_PAGE}
          </Button>
        }
      />
    </Flex>
  );
};
