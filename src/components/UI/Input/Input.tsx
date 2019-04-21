import React from 'react';
import styles from './Input.module.css'

const Input = (props:any) => {

  let inputElement:any

  switch(props.elementType){
    case('input'):
      inputElement = <input
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
        break;
    case('textarea'):
      inputElement = <textarea
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
        break;
    case('select'):
      inputElement = (
        <select
          className={styles.InputElement}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.display}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
  }
  console.log(props.key)

  return(
    <div className={styles.Input}>
      <label className={styles.Label}>
        {props.label}
        {inputElement}
      </label>
    </div>
  );
}
export default Input
