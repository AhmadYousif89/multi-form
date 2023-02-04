import { FC, PropsWithChildren } from 'react';
import { useSubscription } from '../../context/subscription';

import styles from './styles/button.module.css';

type BtnVariant = 'next_btn' | 'prev_btn' | 'nav_btn' | 'confirm_btn';
type Steps = 'UserInfo' | 'SelectPlan' | 'SelectAddons' | 'Confirmation' | 'Summary';
type ButtonProps = {
  id?: Steps;
  pressed?: boolean;
  disabled?: boolean;
  variant: BtnVariant;
  onClick?: () => void;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  id,
  children,
  variant,
  onClick,
  pressed,
  disabled,
}) => {
  const {
    state: { stepNumber },
    setFormIsCompleted,
    setFormStepNumber,
  } = useSubscription();

  const onComplete = () => {
    setFormStepNumber(5);
    setFormIsCompleted(true);
  };

  const classes =
    variant === 'next_btn'
      ? styles.next__btn
      : variant === 'prev_btn'
      ? styles.prev__btn
      : variant === 'nav_btn'
      ? styles.nav__btn
      : variant === 'confirm_btn'
      ? styles.confirm__btn
      : '';

  const navBtnTitle =
    id === 'UserInfo'
      ? 'Step 1 personal info'
      : id === 'SelectPlan'
      ? 'Step 2 select your plan'
      : id === 'SelectAddons'
      ? 'Step 3 choose add-ons'
      : id === 'Confirmation'
      ? 'Step 4 finishing up'
      : '';

  const nextBtnTitle =
    disabled && stepNumber === 1
      ? 'fill up the form to continue'
      : disabled && stepNumber === 2
      ? 'select your plan to continue'
      : stepNumber === 1
      ? 'select your plan'
      : stepNumber === 2
      ? 'choose your addons'
      : stepNumber === 3
      ? 'finish up the form'
      : '';

  const prevBtnTitle =
    stepNumber === 2
      ? 'back to personal info'
      : stepNumber === 3
      ? 'back to plans'
      : stepNumber === 4
      ? 'back to addons'
      : '';

  return (
    <button
      disabled={disabled}
      aria-pressed={pressed}
      aria-disabled={disabled}
      title={
        variant === 'nav_btn'
          ? navBtnTitle
          : variant === 'next_btn'
          ? nextBtnTitle
          : variant === 'prev_btn'
          ? prevBtnTitle
          : variant === 'confirm_btn'
          ? 'confirm subscription'
          : ''
      }
      onClick={variant === 'confirm_btn' ? onComplete : onClick}
      className={`${styles.button} ${classes}`}>
      {children}
    </button>
  );
};
