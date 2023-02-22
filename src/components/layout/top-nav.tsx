import { FC } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import topNavImg from '../../assets/images/bg-sidebar-mobile.svg';
import styles from './styles/top-nav.module.css';

export const TopNavigation: FC = () => {
  const {
    state: { stepNumber, userInputs, planInfo },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [
    userInputs.name,
    userInputs.email,
    userInputs.phone,
    userInputs.cc,
  ].every(Boolean);

  return (
    <header aria-label="top navigation" className={styles.container}>
      <figure>
        <img src={topNavImg} alt="top navigation bar background image" />
      </figure>

      <div>
        <Button
          id={'userInputs'}
          onClick={() => setFormStepNumber(1)}
          pressed={stepNumber === 1}
          variant="nav_btn">
          1
        </Button>
        <Button
          id={'selectPlan'}
          disabled={!userInputIsValid}
          onClick={() => setFormStepNumber(2)}
          pressed={stepNumber === 2}
          variant="nav_btn">
          2
        </Button>
        <Button
          id={'selectAddons'}
          disabled={!planInfo.type}
          onClick={() => setFormStepNumber(3)}
          pressed={stepNumber === 3}
          variant="nav_btn">
          3
        </Button>
        <Button
          id={'summary'}
          disabled={!planInfo.type}
          onClick={() => setFormStepNumber(4)}
          pressed={stepNumber === 4}
          variant="nav_btn">
          4
        </Button>
      </div>
    </header>
  );
};
