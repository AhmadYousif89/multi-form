import { FC, useState, ChangeEvent, InputHTMLAttributes } from 'react';

import { InputNames, useSubscription } from '../../context/subscription';
import styles from './styles/input.module.css';

type InputProps = {
  id: InputNames;
  name: InputNames;
  label?: 'Name' | 'Email Address' | 'Phone Number' | '+';
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({ name, className, ...props }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    state: { userInputs },
    setUserValues,
  } = useSubscription();

  const NAME_REGEX = /^\S+(\s\S+)*$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{1,8}$/;
  const PHONE_REGEX = /^\d{2,}\s?\d{2,}\s?\d{2,}\s?\d{2,}\s?\d{2,}$/;
  const CC_REGEX = /^([1-9][0-9]{0,2})$/;

  let isValid = false;

  const validateAndSubmit = (type: InputNames, value: string) => {
    setIsTouched(true);
    let inputIsValid = false;

    if (type === 'name') {
      inputIsValid = NAME_REGEX.test(value);
      if (!inputIsValid) setErrorMsg('Invalid name');
      else setUserValues(pv => ({ ...pv, [type]: value }));
    }
    if (type === 'email') {
      inputIsValid = EMAIL_REGEX.test(value);
      if (!inputIsValid) setErrorMsg('Email is not valid');
      else setUserValues(pv => ({ ...pv, [type]: value }));
    }
    if (type === 'phone') {
      inputIsValid = PHONE_REGEX.test(value);
      if (!inputIsValid) setErrorMsg('Invalid phone number');
      else setUserValues(pv => ({ ...pv, [type]: value }));
    }
    if (type === 'cc') {
      inputIsValid = CC_REGEX.test(value);
      if (!inputIsValid) setErrorMsg('Invalid country code');
      else setUserValues(pv => ({ ...pv, [type]: value }));
    }

    if (!inputIsValid && value === '') setErrorMsg('This field is required');
    if (inputIsValid) setErrorMsg('');

    return inputIsValid;
  };

  const onBlurHandler = () => setIsTouched(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name as InputNames;
    const inputValue = e.target.value;

    isValid = validateAndSubmit(inputName, inputValue);
  };

  const isError = isTouched && !isValid;

  const styleInputOnError = isError && errorMsg ? styles.input__error : '';

  const inputValue =
    name === 'name' && userInputs.name
      ? userInputs.name
      : name === 'email' && userInputs.email
      ? userInputs.email
      : name === 'phone' && userInputs.phone
      ? userInputs.phone
      : name === 'cc' && userInputs.cc
      ? userInputs.cc
      : '';

  const renderInput =
    name === 'cc' ? (
      <input
        min={1}
        max={999}
        step={10}
        name={name}
        onBlur={onBlurHandler}
        defaultValue={inputValue}
        onChange={onChangeHandler}
        className={`${styles.input} ${styleInputOnError} ${className}`}
        {...props}
      />
    ) : (
      <input
        name={name}
        onBlur={onBlurHandler}
        defaultValue={inputValue}
        onChange={onChangeHandler}
        className={`${styles.input} ${styleInputOnError} ${className}`}
        {...props}
      />
    );

  return (
    <fieldset className={styles.fieldset}>
      {isError && <span className={styles.error}>{errorMsg}</span>}
      {props.label && (
        <label className={styles.label} htmlFor={props.id}>
          <span>{props.label}</span>
        </label>
      )}
      {renderInput}
    </fieldset>
  );
};
