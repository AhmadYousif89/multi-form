import { FC } from 'react';
import { Card, Input } from '../ui';

import styles from './styles/personal-info.module.css';

export const PersonalInfo: FC = () => {
  return (
    <Card>
      <section className={'general__container'}>
        <div className={'header'}>
          <h2>Personal info</h2>
          <p>Please provide your name, email address and phone number.</p>
        </div>

        <form className={styles.form}>
          <Input type="text" id="name" label="Name" placeholder="e.g. John Snow" />

          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="e.g. johnsnow@gmail.com"
          />

          <Input
            id="phoneNumber"
            type="text"
            label="Phone Number"
            placeholder="e.g. (+1) 234 567 890"
          />
        </form>
      </section>
    </Card>
  );
};
