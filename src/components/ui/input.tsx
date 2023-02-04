import { FC, useState, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { InputTypes, useSubscription } from '../../context/subscription';

import styles from './styles/input.module.css';

type InputProps = {
  id: InputTypes;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label: 'Name' | 'Email Address' | 'Phone Number';
};

export const Input: FC<InputProps> = ({ id, type, label, placeholder }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    state: { userInfo },
    setUserValues,
  } = useSubscription();

  /**
   * some valid paterns : "word" | "word1 word2" | "word1word2"
   */
  const NAME_REGEX = /^\S+(\s\S+)*$/;
  /**
   * some valid paterns : a@a.a | 1@1.1 | a1@a1.a1
   */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  /**
   * some valid paterns : +1 234 567 8900 | +01 234 56 78 89 00 | +012345678900
   */
  const PHONE_REGEX = /^\+\d{1,2}\s?\d{3,}\s?\d{2,}\s?\d{2,}\s?\d{2,}\s?\d{2,}$/;

  const validateAndSubmit = (type: InputTypes, value: string) => {
    setIsTouched(true);
    let isInputValid = false;

    if (type === 'name') {
      isInputValid = NAME_REGEX.test(value);
      if (!isInputValid) setErrorMsg('Invalid name');
      else setUserValues({ type, value });
    }
    if (type === 'email') {
      isInputValid = EMAIL_REGEX.test(value);
      if (!isInputValid) setErrorMsg('Email is not valid');
      else setUserValues({ type, value });
    }
    if (type === 'phoneNumber') {
      isInputValid = PHONE_REGEX.test(value);
      if (!isInputValid) setErrorMsg('Invalid phone number');
      else setUserValues({ type, value });
    }
    if (!isInputValid && value === '') setErrorMsg('This field is required');
    if (isInputValid) setErrorMsg('');

    return isInputValid;
  };

  let isValid = false;

  const onBlurHandler = () => setIsTouched(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name as InputTypes;
    const inputValue = e.target.value;
    isValid = validateAndSubmit(inputName, inputValue);
  };

  const isError = isTouched && !isValid;

  const styleInputOnError = errorMsg ? styles.input__error : '';

  const inputDefaultValue =
    label === 'Name' && userInfo.name
      ? userInfo.name
      : label === 'Email Address' && userInfo.email
      ? userInfo.email
      : label === 'Phone Number' && userInfo.phoneNumber
      ? userInfo.phoneNumber
      : '';

  return (
    <fieldset>
      <label className={styles.label} htmlFor={id}>
        <span>{label}</span>
        {isError && <span className={styles.error}>{errorMsg}</span>}
      </label>
      <input
        required
        id={id}
        name={id}
        type={type}
        defaultValue={inputDefaultValue}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={`${styles.input} ${styleInputOnError}`}
      />
    </fieldset>
  );
};
