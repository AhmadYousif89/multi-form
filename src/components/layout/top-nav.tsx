import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';
import topNavImg from '../../assets/images/bg-sidebar-mobile.svg';
import styles from './styles/top-nav.module.css';

export const TopNavigation = () => {
  const {
    state: { stepNumber, userInputs, planInfo },
    setCurrentStepNumber,
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
          onClick={() => setCurrentStepNumber(1)}
          pressed={stepNumber === 1}
          variants="nav_btn">
          1
        </Button>
        <Button
          id={'selectPlan'}
          disabled={!userInputIsValid}
          onClick={() => setCurrentStepNumber(2)}
          pressed={stepNumber === 2}
          variants="nav_btn">
          2
        </Button>
        <Button
          id={'selectAddons'}
          disabled={!planInfo.type}
          onClick={() => setCurrentStepNumber(3)}
          pressed={stepNumber === 3}
          variants="nav_btn">
          3
        </Button>
        <Button
          id={'summary'}
          disabled={!planInfo.type}
          onClick={() => setCurrentStepNumber(4)}
          pressed={stepNumber === 4}
          variants="nav_btn">
          4
        </Button>
      </div>
    </header>
  );
};
