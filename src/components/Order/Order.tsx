import React from 'react';
import styles from './Order.module.css'

interface order {
  ingredients: {
    [key: string]: number
  },
  totalPrice: number,
  id: string
}

const Order = (props: order) => {
  const ingredients: Array<{ name: string, amount: number }> = []
  for (let name in props.ingredients) {
    ingredients.push({
      name: name,
      amount: props.ingredients[name]
    })
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          marginRight: '10px',
          border: '1px solid #eee',
          padding: '5px'
        }}
        key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    )
  })

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>$ {props.totalPrice.toFixed(2)}</strong></p>
    </div>
  );
}



export default Order
