import { FC } from 'react';
import { Card } from '../ui';
import { useSubscription } from '../../context/subscription';

import styles from './styles/confirmation.module.css';

export const Confirmation: FC = () => {
  const {
    state: { planInfo, billing, addons },
    billingSwitcher,
  } = useSubscription();

  const planPrice = planInfo.price;
  const addonsPrice = addons.map(addon => addon.price).reduce((a, b) => a + b, 0);

  const totalSubscription = planPrice + addonsPrice;

  const additionalAddons =
    addons.length > 0 ? (
      addons.map(addon => (
        <div key={addon.type} className={styles.addon}>
          <span>{addon.type}</span>
          <span className={styles.addon__value}>
            +${addon.price}/{billing === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>
      ))
    ) : (
      <p>no additional addons</p>
    );

  return (
    <Card>
      <section className={`${styles.container} general__container`}>
        <div className={`${styles.header} header`}>
          <h2>Finishing up</h2>
          <p>Double-check everything looks OK before confirming.</p>
        </div>

        <div className={styles.details}>
          <div className={styles.plan__detials}>
            <div>
              <h4>
                {planInfo.type} ({billing})
              </h4>
              <button title="change billing cycle" onClick={billingSwitcher}>
                Change
              </button>
            </div>
            <p className={styles.billing__value}>
              ${planInfo.price}/{billing === 'monthly' ? 'mo' : 'yr'}
            </p>
          </div>

          <div className={styles.addons__details}>
            {addons.length > 0 && <p>additional addons</p>}
            {additionalAddons}
          </div>

          {billing === 'yearly' && (
            <div className={styles.gifts}>
              <p>gifts</p>
              <span>2 months free</span>
            </div>
          )}
        </div>

        <div className={styles.total}>
          <span>Total (per {billing === 'monthly' ? 'month' : 'year'})</span>
          <span className={styles.total__value}>
            +${totalSubscription}/{billing === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>
      </section>
    </Card>
  );
};
