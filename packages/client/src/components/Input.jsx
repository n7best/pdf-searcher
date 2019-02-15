import React from 'react';
import { css } from "emotion";

const Input = ({ type="text", onChange, value, placeholder}) => (
  <input 
    value={value}
    type={type}
    className={styles.input}
    placeholder={placeholder}
    onChange={e => {
      e.persist();
      onChange(e.target.value)
    }}  
  />
)

const styles = {
  input: css`
    padding: 15px 30px;
    background: rgba(239, 239, 239, 0.8);;
    border: 1px solid #ccc;
    font-size: 18px;
    width: 100%;

    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
  `
}

export default Input;