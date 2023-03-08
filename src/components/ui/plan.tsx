import { FC } from 'react';

import { PlanTypes, useSubscription } from '../../context/subscription';
import styles from './styles/plan.module.css';

type PlanPrices = '9' | '12' | '15' | '90' | '120' | '150';
type PlanProps = {
  icon: string;
  plan: PlanTypes;
  price: PlanPrices;
};

export const Plans: FC<PlanProps> = ({ plan, price, icon }) => {
  const {
    state: { planInfo, billing },
    setSelectedPlan,
  } = useSubscription();

  return (
    <button
      className={styles.container}
      aria-selected={planInfo.type === plan}
      onClick={() =>
        setSelectedPlan(pv =>
          pv.type === plan ? { type: '', price: 0 } : { type: plan, price: +price },
        )
      }>
      <figure>
        <img src={icon} alt={`${plan} plan icon`} />
        <figcaption className="sr-only">image for the {plan} plan</figcaption>
      </figure>

      <div className={styles.details}>
        <h3>{plan}</h3>
        <p>
          ${price}/{billing === 'monthly' ? 'mo' : 'yr'}
        </p>
        {billing === 'yearly' && <span>2 months free</span>}
      </div>
    </button>
  );
};
