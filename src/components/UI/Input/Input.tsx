import React from 'react';
import styles from './Input.module.css'

const Input = (props:any) => {

  let inputElement:any

  switch(props.elementType){
    case('input'):
      inputElement = <input
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}/>
    case('textarea'):
      inputElement = <textarea
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}/>
    default:
      inputElement = <input
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}/>
  }

  return(
    <div className={styles.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
}
export default Input
