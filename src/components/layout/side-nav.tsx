import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';

import styles from './styles/side-nav.module.css';
import sideImage from '../../assets/images/bg-sidebar-desktop.svg';

export const SideNavigation = () => {
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
    <aside aria-label="side navigation" className={styles.container}>
      <figure>
        <img src={sideImage} alt="" />
      </figure>

      <ul>
        <li className={styles.li}>
          <Button
            id={'userInputs'}
            onClick={() => setCurrentStepNumber(1)}
            pressed={stepNumber === 1}
            variants="nav_btn">
            1
          </Button>
          <div className={styles.li__desc}>
            <p>step 1</p>
            <h2>your info</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'selectPlan'}
            disabled={!userInputIsValid}
            onClick={() => setCurrentStepNumber(2)}
            pressed={stepNumber === 2}
            variants="nav_btn">
            2
          </Button>
          <div className={styles.li__desc}>
            <p>step 2</p>
            <h2>select plan</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'selectAddons'}
            disabled={!planInfo.type}
            onClick={() => setCurrentStepNumber(3)}
            pressed={stepNumber === 3}
            variants="nav_btn">
            3
          </Button>
          <div className={styles.li__desc}>
            <p>step 3</p>
            <h2>add-ons</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'summary'}
            disabled={!planInfo.type}
            onClick={() => setCurrentStepNumber(4)}
            pressed={stepNumber === 4}
            variants="nav_btn">
            4
          </Button>
          <div className={styles.li__desc}>
            <p>step 4</p>
            <h2>summary</h2>
          </div>
        </li>
      </ul>
    </aside>
  );
};
