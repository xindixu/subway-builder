import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

interface control {
  [key:string]: string
}

const controls: control[] = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheeese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const BuildControls = (props: any) => (
  <div className={styles.BuildControls}>
    <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    {
      controls.map(ctrl => (
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        />
      ))
    }
    <button
      className={styles.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>ORDER NOW</button>
  </div>
)


export default BuildControls
