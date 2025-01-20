import { useEffect, useState } from "react";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { InterfaceLabels } from "../constants";
import ru_RU from "antd/es/locale/ru_RU";
import styles from "./baseLayout.module.css";

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
  const navigate = useNavigate();

  const readingPathName = document.location.pathname?.split("/")[1];
  const [current, setCurrent] = useState(readingPathName);

  useEffect(() => {
    if (readingPathName !== current) {
      setCurrent(readingPathName);
    }
  }, [readingPathName]);

  const onClick: MenuProps["onClick"] = (e) => navigate(`/qr-scaner${e.key}`);

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
