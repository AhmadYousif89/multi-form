import { TopNavigation } from './top-nav';
import { SideNavigation } from './side-nav';
import { DisplayStep } from './display-step';

import styles from './styles/view.module.css';

export const View = () => {
  return (
    <div className={styles.view__container}>
      <TopNavigation />
      <SideNavigation />
      <DisplayStep />
    </div>
  );
};
