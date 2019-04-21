import React from 'react'
import Sandwich from '../../Sandwich/Sandwich'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'

const CheckoutSummary = (props:any) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you enjoy your sandwich!</h1>
      <div style={{width:'100%'}}>
        <Sandwich ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary
