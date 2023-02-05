import { FC, PropsWithChildren } from 'react';
import { useSubscription } from '../../context/subscription';

import styles from './styles/button.module.css';

type BtnVariant = 'next_btn' | 'prev_btn' | 'nav_btn' | 'confirm_btn';
type Steps = 'UserInfo' | 'SelectPlan' | 'SelectAddons' | 'Summary' | 'Confirmation';
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
    state: { stepNumber, isCompleted },
    setFormIsCompleted,
    setFormStepNumber,
  } = useSubscription();

  const onComplete = () => {
    setFormStepNumber(5);
    setFormIsCompleted(true);
  };

  let classes = '';
  if (variant === 'nav_btn') classes = styles.nav__btn;
  if (variant === 'next_btn') classes = styles.next__btn;
  if (variant === 'prev_btn') classes = styles.prev__btn;
  if (variant === 'confirm_btn') classes = styles.confirm__btn;

  let navBtnTitle = '';
  if (id === 'UserInfo') navBtnTitle = 'Step 1 personal info';
  if (id === 'SelectPlan') navBtnTitle = 'Step 2 select your plan';
  if (id === 'SelectAddons') navBtnTitle = 'Step 3 choose add-ons';
  if (id === 'Confirmation') navBtnTitle = 'Step 4 finishing up';
  if (isCompleted) navBtnTitle = 'disabled';

  let nextBtnTitle = '';
  if (disabled) {
    if (stepNumber === 1) nextBtnTitle = 'fill up the form to continue';
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
  if (variant === 'nav_btn') title = navBtnTitle;
  if (variant === 'prev_btn') title = prevBtnTitle;
  if (variant === 'next_btn' || variant === 'confirm_btn') title = nextBtnTitle;

  return (
    <button
      title={title}
      aria-pressed={pressed}
      disabled={disabled || isCompleted}
      aria-disabled={disabled || isCompleted}
      onClick={variant === 'confirm_btn' ? onComplete : onClick}
      className={`${styles.button} ${classes}`}>
      {children}
    </button>
  );
};
