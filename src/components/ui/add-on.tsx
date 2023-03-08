import { FC } from 'react';
import { AddonTypes, useSubscription } from '../../context/subscription';

import styles from './styles/add-on.module.css';

type AddonPrices = '1' | '2' | '10' | '20';
type AddonProps = {
  description: string;
  addon: AddonTypes;
  price: AddonPrices;
};

export const Addon: FC<AddonProps> = ({ addon, price, description }) => {
  const {
    state: { addons, billing },
    setPlanAddon,
  } = useSubscription();

  const addonIsSelected = addons.some(a => a.type === addon);

  return (
    <li
      onClick={() => setPlanAddon({ type: addon, price: +price })}
      className={styles.container}
      aria-selected={addonIsSelected}>
      <input
        type={'checkbox'}
        checked={addonIsSelected}
        className={styles.checkbox}
        onChange={e => e.target.checked}
      />
      <div className={styles.details}>
        <h3>{addon}</h3>
        <p>{description}</p>
      </div>
      <div>
        +${price}/{billing === 'monthly' ? 'mo' : 'yr'}
      </div>
    </li>
  );
};
