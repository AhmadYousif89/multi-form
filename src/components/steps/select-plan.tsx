import { Card, PlanSwitcher, Plans } from '../ui';
import { useSubscription } from '../../context/subscription';

import styles from './styles/select-plan.module.css';
import proIcon from '../../assets/icons/icon-pro.svg';
import arcadeIcon from '../../assets/icons/icon-arcade.svg';
import advancedIcon from '../../assets/icons/icon-advanced.svg';

export const SelectPlan = () => {
  const {
    state: { billing },
  } = useSubscription();

  return (
    <Card>
      <section className={'general__container'}>
        <div className={'header'}>
          <h2>Select your plan</h2>
          <p>You have the option of monthly or yearly billing.</p>
        </div>

        <div className={styles.plan__container}>
          <Plans
            plan={'Arcade'}
            icon={arcadeIcon}
            price={billing === 'yearly' ? '90' : '9'}
          />
          <Plans
            plan={'Advanced'}
            icon={advancedIcon}
            price={billing === 'yearly' ? '120' : '12'}
          />
          <Plans
            plan={'Pro'}
            icon={proIcon}
            price={billing === 'yearly' ? '150' : '15'}
          />
        </div>

        <PlanSwitcher />
      </section>
    </Card>
  );
};
