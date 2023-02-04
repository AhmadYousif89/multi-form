import { FC } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import topNavImg from '../../assets/images/bg-sidebar-mobile.svg';
import styles from './styles/top-nav.module.css';

export const TopNavigation: FC = () => {
  const {
    state: { stepNumber, userInfo, planInfo, isCompleted },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [userInfo.name, userInfo.email, userInfo.phoneNumber].every(
    Boolean,
  );

  return (
    <header className={styles.container}>
      {!isCompleted && (
        <ul>
          <Button
            id={'UserInfo'}
            onClick={() => setFormStepNumber(1)}
            pressed={stepNumber === 1}
            variant="nav_btn">
            1
          </Button>
          {userInputIsValid && (
            <Button
              id={'SelectPlan'}
              onClick={() => setFormStepNumber(2)}
              pressed={stepNumber === 2}
              variant="nav_btn">
              2
            </Button>
          )}
          {planInfo.type && (
            <>
              <Button
                id={'SelectAddons'}
                onClick={() => setFormStepNumber(3)}
                pressed={stepNumber === 3}
                variant="nav_btn">
                3
              </Button>
              <Button
                id={'Confirmation'}
                onClick={() => setFormStepNumber(4)}
                pressed={stepNumber === 4}
                variant="nav_btn">
                4
              </Button>
            </>
          )}
        </ul>
      )}

      <figure>
        <img src={topNavImg} alt="top navigation bar background image" />
      </figure>
    </header>
  );
};
