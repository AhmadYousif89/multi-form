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
          <Input
            id="name"
            type="text"
            name="name"
            label="Name"
            placeholder="e.g. John Snow"
          />

          <Input
            id="email"
            type="email"
            name="email"
            label="Email Address"
            placeholder="e.g. johnsnow@gmail.com"
          />

          <div>
            <Input
              id="cc"
              name="cc"
              label="+"
              type="number"
              placeholder="123"
              className={styles.cc__input}
            />
            <Input
              id="phone"
              type="text"
              name="phone"
              label="Phone Number"
              placeholder="e.g. 01234567890"
            />
          </div>
        </form>
      </section>
    </Card>
  );
};
