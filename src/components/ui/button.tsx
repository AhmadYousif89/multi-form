import { FC, PropsWithChildren } from 'react';
import { useSubscription } from '../../context/subscription';

import styles from './styles/button.module.css';

type BtnVariant = 'next_btn' | 'prev_btn' | 'nav_btn' | 'confirm_btn';
type Steps = 'userInputs' | 'selectPlan' | 'selectAddons' | 'summary' | 'confirmation';
type ButtonProps = {
  id?: Steps;
  pressed?: boolean;
  disabled?: boolean;
  variants: BtnVariant;
  onClick?: () => void;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  id,
  children,
  variants,
  onClick,
  pressed,
  disabled,
}) => {
  const {
    state: { stepNumber, subscriptionState },
    setSubcriptionState,
    setCurrentStepNumber,
  } = useSubscription();

  const onComplete = () => {
    setCurrentStepNumber(5);
    setSubcriptionState('complete');
  };

  let classes = '';
  if (variants === 'nav_btn') classes = styles.nav__btn;
  if (variants === 'next_btn') classes = styles.next__btn;
  if (variants === 'prev_btn') classes = styles.prev__btn;
  if (variants === 'confirm_btn') classes = styles.confirm__btn;

  let navBtnTitle = '';
  if (id === 'userInputs') navBtnTitle = 'Step 1 personal info';
  if (id === 'selectPlan') navBtnTitle = 'Step 2 select your plan';
  if (id === 'selectAddons') navBtnTitle = 'Step 3 choose add-ons';
  if (id === 'summary') navBtnTitle = 'Step 4 finishing up';
  if (subscriptionState === 'complete') navBtnTitle = 'disabled';

  let nextBtnTitle = '';
  if (disabled) {
    if (stepNumber === 1) nextBtnTitle = 'fill out the form to continue';
    if (stepNumber === 2) nextBtnTitle = 'select your plan to continue';
  } else {
    if (stepNumber === 1) nextBtnTitle = 'select your plan';
    if (stepNumber === 2) nextBtnTitle = 'choose your addons';
    if (stepNumber === 3) nextBtnTitle = 'finish up the form';
  }

  let prevBtnTitle = '';
  if (stepNumber === 2) prevBtnTitle = 'back to personal info';
  if (stepNumber === 3) prevBtnTitle = 'back to plans';
  if (stepNumber === 4) prevBtnTitle = 'back to addons';

  let title = '';
  if (variants === 'nav_btn') title = navBtnTitle;
  if (variants === 'prev_btn') title = prevBtnTitle;
  if (variants === 'next_btn' || variants === 'confirm_btn') title = nextBtnTitle;

  return (
    <button
      title={title}
      aria-pressed={pressed}
      disabled={disabled || subscriptionState === 'complete'}
      onClick={variants === 'confirm_btn' ? onComplete : onClick}
      className={`${styles.button} ${classes}`}>
      {children}
    </button>
  );
};
