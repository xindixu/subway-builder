import React from 'react';
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NaviationItem'

const NavigationItems = (props:any) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>Builder</NavigationItem>
    <NavigationItem link="/Orders">Orders</NavigationItem>
  </ul>
)

export default NavigationItems;
