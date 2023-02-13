import { FC, useEffect } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import styles from './styles/footer.module.css';

export const BottomNavigation: FC = () => {
  const {
    state: { stepNumber, userInputs, planInfo, addons, subscriptionState },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [
    userInputs.name,
    userInputs.email,
    userInputs.phone,
    userInputs.cc,
  ].every(Boolean);

  const submitSubscriptionData = () => {
    const sub_details = { userInputs, planInfo, addons };
    console.log(sub_details);
  };

  useEffect(() => {
    if (subscriptionState) submitSubscriptionData();
  }, [subscriptionState]);

  const nextStep = () => setFormStepNumber(pvStepNum => pvStepNum + 1);

  const prevStep = () => setFormStepNumber(pvStepNum => pvStepNum - 1);

  const isDisabled =
    (stepNumber === 1 && !userInputIsValid) || (stepNumber === 2 && !planInfo.type);

  return (
    <>
      {subscriptionState === 'active' && (
        <footer aria-label="bottom navigation" className={styles.container}>
          <div className={styles.action__buttons}>
            {stepNumber > 1 && (
              <Button onClick={prevStep} variant="prev_btn">
                go back
              </Button>
            )}
            {stepNumber < 5 && (
              <Button
                onClick={nextStep}
                disabled={isDisabled}
                variant={`${stepNumber === 4 ? 'confirm' : 'next'}_btn`}>
                {stepNumber === 4 ? 'confirm' : 'next step'}
              </Button>
            )}
          </div>
        </footer>
      )}
    </>
  );
};
