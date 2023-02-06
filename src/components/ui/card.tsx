import { FC, PropsWithChildren } from 'react';

import styles from './styles/card.module.css';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div aria-label="card wrapper" className={styles.container}>
      {children}
    </div>
  );
};
