import { FC, useEffect } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import styles from './styles/footer.module.css';

export const BottomNavigation: FC = () => {
  const {
    state: { stepNumber, userInfo, planInfo, addons, isCompleted },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [userInfo.name, userInfo.email, userInfo.phoneNumber].every(
    Boolean,
  );

  const submitSubscriptionData = () => {
    const sub_details = { userInfo, planInfo, addons };
    console.log(sub_details);
  };

  useEffect(() => {
    if (isCompleted) submitSubscriptionData();
  }, [isCompleted]);

  const nextStep = () => setFormStepNumber(pvStepNum => pvStepNum + 1);

  const prevStep = () => setFormStepNumber(pvStepNum => pvStepNum - 1);

  const isDisabled =
    (stepNumber === 1 && !userInputIsValid) || (stepNumber === 2 && !planInfo.type);

  return (
    <footer aria-label="bottom navigation" className={styles.container}>
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
