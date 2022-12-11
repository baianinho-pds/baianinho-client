import { useState } from "react";
import ReactInputMask from "react-input-mask";
import styles from "./input.module.css";

interface InputProps extends Partial<HTMLInputElement> {
  label?: string;
  mask?: string;
  onChangeInputValue?: (value: string) => void;
}

export function Input({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  mask,
  minLength,
  maxLength,
  onChangeInputValue,
}: InputProps) {
    setInputValue(value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChangeInputValue && onChangeInputValue(e.target.value);
  };

  return (
    <div className={styles.containerInput}>
      <label htmlFor={id || name}>{label}</label>
      <>
        {mask ? (
          <ReactInputMask
            mask={mask}
            type={type}
            name={name}
            id={id || name}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            value={inputValue}
            onChange={(e) => onChange(e)}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={id || name}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            value={inputValue}
            onChange={(e) => onChange(e)}
          />
        )}
      </>
    </div>
  );
}