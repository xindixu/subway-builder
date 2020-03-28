import React from 'react'
import Logo from '../../Logo/Logo'

import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props: any) => {
  const attachedClasses = [styles.SideDrawer, styles.Close]
  if(props.open){
    attachedClasses[1] =  styles.Open
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  )
}

export default SideDrawer
