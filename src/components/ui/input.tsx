import { FC, useState, ChangeEvent, HTMLInputTypeAttribute } from 'react';

import { InputNames, useSubscription } from '../../context/subscription';

import styles from './styles/input.module.css';

type InputProps = {
  id: InputNames;
  name: InputNames;
  className?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label?: 'Name' | 'Email Address' | 'Phone Number' | '+';
};

export const Input: FC<InputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  className = '',
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    state: { userInputs },
    setUserValues,
  } = useSubscription();

  /**
   * some valid paterns : "word" | "word1 word2" | "word1word2"
   */
  const NAME_REGEX = /^\S+(\s\S+)*$/;
  /**
   * some valid paterns : a@a.a | 1@1.a | a1@a1.aa
   */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{1,8}$/;
  /**
   * some valid paterns : +1 234 567 8900 | +01 234 56 78 89 00 | +012345678900
   */
  const PHONE_REGEX = /^\d{2,}\s?\d{2,}\s?\d{2,}\s?\d{2,}\s?\d{2,}$/;

  const CC_REGEX = /^([1-9][0-9]{0,2})$/; // 1 ==> 999

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
        required
        id={id}
        min={1}
        max={999}
        step={10}
        type={type}
        name={name}
        defaultValue={inputValue}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={`${styles.input} ${styleInputOnError} ${className}`}
      />
    ) : (
      <input
        required
        id={id}
        type={type}
        name={name}
        defaultValue={inputValue}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={`${styles.input} ${styleInputOnError} ${className}`}
      />
    );

  return (
    <fieldset className={styles.fieldset}>
      {isError && <span className={styles.error}>{errorMsg}</span>}
      {label && (
        <label className={styles.label} htmlFor={id}>
          <span>{label}</span>
        </label>
      )}
      {renderInput}
    </fieldset>
  );
};
