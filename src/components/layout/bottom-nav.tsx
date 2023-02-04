import { FC } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import styles from './styles/footer.module.css';

type FooterProps = {};

export const BottomNavigation: FC<FooterProps> = ({}) => {
  const {
    state: { stepNumber, userInfo, planInfo, isCompleted },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [userInfo.name, userInfo.email, userInfo.phoneNumber].every(
    Boolean,
  );

  const nextStep = () =>
    setFormStepNumber(pvStepNum => (pvStepNum === 5 ? pvStepNum : pvStepNum + 1));

  const prevStep = () =>
    setFormStepNumber(pvStepNum => (pvStepNum === 1 ? pvStepNum : pvStepNum - 1));

  const isDisabled =
    (stepNumber === 1 && !userInputIsValid) || (stepNumber === 2 && !planInfo.type);

  return (
    <footer className={styles.container}>
      <div className={styles.action__buttons}>
        {stepNumber > 1 && stepNumber < 5 && (
          <Button onClick={prevStep} variant="prev_btn">
            go back
          </Button>
        )}
        {stepNumber < 5 && !isCompleted && (
          <Button
            onClick={nextStep}
            disabled={isDisabled}
            variant={`${stepNumber === 4 ? 'confirm' : 'next'}_btn`}>
            {stepNumber === 4 ? 'confirm' : 'next step'}
          </Button>
        )}
      </div>
    </footer>
  );
};
