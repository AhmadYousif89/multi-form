import {
  Confirmation,
  PersonalInfo,
  SelectAddons,
  SelectPlan,
  Summary,
} from '../../components/steps';
import { useSubscription } from '../../context/subscription';

import styles from './styles/display-steps.module.css';

export const DisplayStep = () => {
  const {
    state: { stepNumber },
  } = useSubscription();

  return (
    <div className={styles.container}>
      {stepNumber === 1 && <PersonalInfo />}
      {stepNumber === 2 && <SelectPlan />}
      {stepNumber === 3 && <SelectAddons />}
      {stepNumber === 4 && <Confirmation />}
      {stepNumber === 5 && <Summary />}
    </div>
  );
};
