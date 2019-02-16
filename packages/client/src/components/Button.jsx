import React from 'react';
import { css } from "emotion";
import classNames from 'classnames';

const Button = ({ disable, onClick, children }) => (
  <button 
    className={classNames(styles.button, {
      'disable': disable
    })}
    onClick={onClick}
  >{children}</button>
)

const styles = {
  button: css`
    margin: 20px 0;
    background: rgb(57,171,209);
    border: 1px solid #ccc;
    width: 100%;
    padding: 20px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;

    &.disable {
      background: #ccc;
      cursor: not-allowed;
    }
  `
}

export default Button;