import { FC } from 'react';

import sideImage from '../../assets/images/bg-sidebar-desktop.svg';
import { useSubscription } from '../../context/subscription';
import { Button } from '../ui';
import styles from './styles/side-nav.module.css';

export const SideNavigation: FC = () => {
  const {
    state: { stepNumber, userInfo, planInfo },
    setFormStepNumber,
  } = useSubscription();

  const userInputIsValid = [userInfo.name, userInfo.email, userInfo.phoneNumber].every(
    Boolean,
  );

  return (
    <aside aria-label="side navigation" className={styles.container}>
      <figure>
        <img src={sideImage} alt="" />
      </figure>

      <ul>
        <li className={styles.li}>
          <Button
            id={'UserInfo'}
            onClick={() => setFormStepNumber(1)}
            pressed={stepNumber === 1}
            variant="nav_btn">
            1
          </Button>
          <div className={styles.li__desc}>
            <p>step 1</p>
            <h3>your info</h3>
          </div>
        </li>
        {userInputIsValid && (
          <li className={styles.li}>
            <Button
              id={'SelectPlan'}
              onClick={() => setFormStepNumber(2)}
              pressed={stepNumber === 2}
              variant="nav_btn">
              2
            </Button>
            <div className={styles.li__desc}>
              <p>step 2</p>
              <h3>select plan</h3>
            </div>
          </li>
        )}
        {planInfo.type && (
          <>
            <li className={styles.li}>
              <Button
                id={'SelectAddons'}
                onClick={() => setFormStepNumber(3)}
                pressed={stepNumber === 3}
                variant="nav_btn">
                3
              </Button>
              <div className={styles.li__desc}>
                <p>step 3</p>
                <h3>add-ons</h3>
              </div>
            </li>
            <li className={styles.li}>
              <Button
                id={'Confirmation'}
                onClick={() => setFormStepNumber(4)}
                pressed={stepNumber === 4}
                variant="nav_btn">
                4
              </Button>
              <div className={styles.li__desc}>
                <p>step 4</p>
                <h3>summary</h3>
              </div>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};
