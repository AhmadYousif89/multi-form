import { useEffect } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import styles from './styles/footer.module.css';

export const BottomNavigation = () => {
  const {
    state: { stepNumber, userInputs, planInfo, addons, subscriptionState },
    setCurrentStepNumber,
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
    if (subscriptionState === 'complete') submitSubscriptionData();
  }, [subscriptionState]);

  const nextStep = () => setCurrentStepNumber(pvStepNum => pvStepNum + 1);

  const prevStep = () => setCurrentStepNumber(pvStepNum => pvStepNum - 1);

  const isDisabled =
    (stepNumber === 1 && !userInputIsValid) || (stepNumber === 2 && !planInfo.type);

  return (
    <>
      {subscriptionState === 'active' && (
        <footer aria-label="bottom navigation" className={styles.container}>
          <div className={styles.action__buttons}>
            {stepNumber > 1 && (
              <Button onClick={prevStep} variants="prev_btn">
                go back
              </Button>
            )}
            {stepNumber < 5 && (
              <Button
                onClick={nextStep}
                disabled={isDisabled}
                variants={`${stepNumber === 4 ? 'confirm' : 'next'}_btn`}>
                {stepNumber === 4 ? 'confirm' : 'next step'}
              </Button>
            )}
          </div>
        </footer>
      )}
    </>
  );
};
