import { FC } from 'react';
import { Card, Addon } from '../ui';
import { useSubscription } from '../../context/subscription';

import styles from './styles/select-add-ons.module.css';

export const SelectAddons: FC = () => {
  const {
    state: { billing },
  } = useSubscription();

  return (
    <Card>
      <section className={`${styles.container} general__container`}>
        <div className={'header'}>
          <h2>Pick your add-ons</h2>
          <p>Add-ons help enhance your gaming experince</p>
        </div>

        <ul>
          <Addon
            addon={'Online service'}
            description="Access to multiplayer games"
            price={billing === 'yearly' ? '10' : '1'}
          />
          <Addon
            addon={'Large storage'}
            description="Extra 1TB of cloud save"
            price={billing === 'yearly' ? '20' : '2'}
          />
          <Addon
            addon={'Customizable profile'}
            description="Custom theme on your profile"
            price={billing === 'yearly' ? '20' : '2'}
          />
        </ul>
      </section>
    </Card>
  );
};
