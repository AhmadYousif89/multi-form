import { FC } from 'react';
import {
  Confirmation,
  PersonalInfo,
  SelectAddons,
  SelectPlan,
  Summary,
} from '../../components/steps';
import { useSubscription } from '../../context/subscription';
import { BottomNavigation } from './bottom-nav';

import styles from './styles/display-steps.module.css';

export const DisplayStep: FC = () => {
  const {
    state: { stepNumber },
  } = useSubscription();

  return (
    <div className={styles.display__wrapper}>
      <div aria-label="form steps" className={styles.container}>
        {stepNumber === 1 && <PersonalInfo />}
        {stepNumber === 2 && <SelectPlan />}
        {stepNumber === 3 && <SelectAddons />}
        {stepNumber === 4 && <Summary />}
        {stepNumber === 5 && <Confirmation />}
      </div>
      <BottomNavigation />
    </div>
  );
};
