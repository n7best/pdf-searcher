import React, { useState, useCallback } from 'react';
import { css } from "emotion";
import Input from './Input';
import { get, set } from 'lodash';
import Button from 'Components/Button';

const ObjectForm = ({ object = {}, hide = [], labels={}, onSubmit }) => {
  const [form, setForm] = useState(object);

  const renderForm = (object, parent) => {
    return Object.entries(object).map(([label, value])=> {
      const currentKey = parent ? `${parent}.${label}` : label;
      if(hide.indexOf(currentKey) > -1) return null;

      if(typeof value === 'object') return (
        <div key={currentKey}>
          <p className={styles.label}>{labels[currentKey] || label}</p>
          <div className={styles.subField}>
            { renderForm(value, currentKey) }
          </div>
        </div>
      )
      
      return (
        <div key={currentKey}>
          <p className={styles.label}>{labels[currentKey] || label}</p>
          <Input 
            value={value}
            onChange={value => {
              const newForm = {...form};
              set(newForm, currentKey, value);
              setForm(newForm)
            }}
          />
        </div>
      )
    })
  }

  return (
    <div>
      {
        renderForm(form, null)
      }
      <Button
        onClick={() => onSubmit?.(form)}
      >Update</Button>
    </div>
  )
}

const styles = {
  container: css`
    padding: 10px 20px;
    border: 1px solid #ccc;
  `,
  label: css`
    text-transform: capitalize;
  `,
  subField: css`
    border: 1px solid #ccc;
    padding: 0px 15px 20px 15px;
  `
}

export default ObjectForm;