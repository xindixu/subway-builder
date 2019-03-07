import React from 'react';
import styles from './NavigationItem.module.css'


const NavigationItem = (props:any) => (
  <li className={styles.NavigationItem}>
    <a href={props.link}
      className={props.active ? styles.active : ""}>
      {props.children}
    </a>
  </li>
)

export default NavigationItem;
