import { useSubscription } from '../../context/subscription';
import styles from './styles/plan-switcher.module.css';

export const PlanSwitcher = () => {
  const {
    state: { billing },
    billingSwitcher,
  } = useSubscription();

  return (
    <div className={styles.container} aria-checked={billing === 'yearly' ? true : false}>
      <label
        htmlFor="switcher"
        title={`switch to ${billing === 'yearly' ? 'monthly' : 'yearly'} billing`}
        className={styles.label}>
        <input
          id="switcher"
          type="checkbox"
          onClick={billingSwitcher}
          className={styles.switcher}
        />
      </label>
      <span className={styles.duration}>Monthly</span>
      <span className={styles.duration}>Yearly</span>
    </div>
  );
};
