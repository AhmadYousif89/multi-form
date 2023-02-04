import { FC } from 'react';
import { Card } from '../ui';

import { useSubscription } from '../../context/subscription';
import styles from './styles/summary.module.css';
import confirmIcon from '../../assets/icons/icon-thank-you.svg';

type SummaryProps = {};

export const Summary: FC<SummaryProps> = () => {
  const { resetSubscription } = useSubscription();

  return (
    <Card>
      <section className={styles.container}>
        <figure>
          <img src={confirmIcon} alt="thank you icon" width={60} />
        </figure>

        <h2>Thank you!</h2>

        <p>
          <span>
            Thank you for confirming your subscription! We hope you had fun using our
            platform. If you ever need support, please feel free to email us at
          </span>
          <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>
        </p>

        <button
          title="close form"
          onClick={() => resetSubscription()}
          className={styles.reset}>
          <span>&times;</span>
        </button>
      </section>
    </Card>
  );
};
