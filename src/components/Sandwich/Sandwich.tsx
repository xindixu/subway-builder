import React from 'react'
import styles from './Sandwich.module.css'
import SandwichIngredient from './SandwichIngredient/SandwichIngredient'

const Sandwich = (props:any) => {
  let transformIngredients = Object.keys(props.ingredients)
      .map(igKey => {
        return [...Array( props.ingredients[igKey] )]
        .map((_,i) => {
          return <SandwichIngredient key={igKey + i} type={igKey} />
        })
      })
      .reduce((arr,el) => {
        return arr.concat(el)
      }, [])

  return(
    <div className={styles.Sandwich}>
      <SandwichIngredient type="bread-top"/>
      {transformIngredients.length == 0 ?
        <p>Please start adding ingredients!</p>
        : transformIngredients
      }
      <SandwichIngredient type="bread-bottom"/>
    </div>
  )
}

export default Sandwich
