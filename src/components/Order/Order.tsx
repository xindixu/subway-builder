import React from 'react';
import styles from './Order.module.css'

const Order = (props:any) => (
  <div className={styles.Order}>
    <p>ingredients: Salad(1)</p>
    <p>Price: <strong>$ 5.45</strong></p>
  </div>
);

export default Order
