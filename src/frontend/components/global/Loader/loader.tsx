import { CircleLoader } from "react-spinners";

import styles from "./loader.module.css";
import { useTheme } from "@/frontend/hooks/useTheme";

interface Props {
  isLoading: boolean;
}

function Loader({ isLoading }: Props) {
  const { colors } = useTheme();
  if (!isLoading) return <></>;

  return (
    <div className={styles.loader}>
      <CircleLoader color={colors.primary} size={50} />
    </div>
  );
}

export default Loader;
