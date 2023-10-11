import { CircleLoader } from 'react-spinners';

import styles from './loader.module.css';

interface Props {
  isLoading: boolean;
}

function Loader({ isLoading }: Props) {
  if (!isLoading) return <></>;

  return (
    <div className={styles.loader}>
      <CircleLoader color="#f2bd08" size={50} />
    </div>
  );
}

export default Loader;
