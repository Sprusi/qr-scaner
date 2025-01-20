import { useEffect, useState } from "react";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { InterfaceLabels } from "../constants";
import ru_RU from "antd/es/locale/ru_RU";
import styles from "./baseLayout.module.css";
import { useTitle } from "../utils/useTitle";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: InterfaceLabels.MENU_KEY_GENERATE,
    key: "generate",
  },
  {
    label: InterfaceLabels.MENU_KEY_SCAN,
    key: "scan",
  },
  {
    label: InterfaceLabels.MENU_KEY_SCAN_HISTORY,
    key: "scan-history",
  },
  {
    label: InterfaceLabels.MENU_KEY_GENERATE_HISTORY,
    key: "generate-history",
  },
];

export const BaseLayout = () => {
  useTitle(InterfaceLabels.TITLE_PREFIX);
  const navigate = useNavigate();

  const readingPathNameElements = document.location.pathname?.split("/");
  const readingPathName =
    readingPathNameElements[readingPathNameElements.length - 1];
  const [current, setCurrent] = useState(readingPathName);

  useEffect(() => {
    if (readingPathName !== current) {
      setCurrent(readingPathName);
    }
  }, [readingPathName]);

  const onClick: MenuProps["onClick"] = (e) => navigate(e.key);

  return (
    <ConfigProvider locale={ru_RU}>
      <Menu
        className={styles.menu}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </ConfigProvider>
  );
};
