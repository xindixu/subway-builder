import React from 'react'
import logo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = (props:any) => (
  <div className={styles.Logo}>
    <img src={logo}/>
  </div>
)

export default Logo
