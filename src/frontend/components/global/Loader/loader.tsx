import { CircleLoader } from "react-spinners";

import styles from "./loader.module.css";
import { THEME_COLORS } from "@/frontend/wrappers/themeHOC";
import { useMediaQuery } from "@mui/material";

interface Props {
  isLoading: boolean;
}

function Loader({ isLoading }: Props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = !prefersDarkMode ? "light" : "dark";

  const color = THEME_COLORS[mode].primary;
  if (!isLoading) return <></>;

  return (
    <div className={styles.loader}>
      <CircleLoader color={color} size={50} />
    </div>
  );
}

export default Loader;
