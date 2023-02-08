import { FC } from 'react';

import { Button } from '../ui';
import { useSubscription } from '../../context/subscription';

import styles from './styles/side-nav.module.css';
import sideImage from '../../assets/images/bg-sidebar-desktop.svg';

export const SideNavigation: FC = () => {
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
    <aside aria-label="side navigation" className={styles.container}>
      <figure>
        <img src={sideImage} alt="" />
      </figure>

      <ul>
        <li className={styles.li}>
          <Button
            id={'userInputs'}
            onClick={() => setFormStepNumber(1)}
            pressed={stepNumber === 1}
            variant="nav_btn">
            1
          </Button>
          <div className={styles.li__desc}>
            <p>step 1</p>
            <h2>your info</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'SelectPlan'}
            disabled={!userInputIsValid}
            onClick={() => setFormStepNumber(2)}
            pressed={stepNumber === 2}
            variant="nav_btn">
            2
          </Button>
          <div className={styles.li__desc}>
            <p>step 2</p>
            <h2>select plan</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'SelectAddons'}
            disabled={!planInfo.type}
            onClick={() => setFormStepNumber(3)}
            pressed={stepNumber === 3}
            variant="nav_btn">
            3
          </Button>
          <div className={styles.li__desc}>
            <p>step 3</p>
            <h2>add-ons</h2>
          </div>
        </li>
        <li className={styles.li}>
          <Button
            id={'Summary'}
            disabled={!planInfo.type}
            onClick={() => setFormStepNumber(4)}
            pressed={stepNumber === 4}
            variant="nav_btn">
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
