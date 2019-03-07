import React from 'react';
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NaviationItem'

const NavigationItems = (props:any) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
)

export default NavigationItems;
