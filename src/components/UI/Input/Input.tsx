import React from 'react';
import styles from './Input.module.css'

const Input = (props:any) => {

  let inputElement = null

  switch(props.inputtype){
    case('input'):
      inputElement = <input className={styles.InputElement} {...props} />
    case('textarea'):
      inputElement = <textarea className={styles.InputElement} {...props} />
    default:
      inputElement = <input className={styles.InputElement} {...props} />
  }

  return(
    <div className={styles.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
}
export default Input
