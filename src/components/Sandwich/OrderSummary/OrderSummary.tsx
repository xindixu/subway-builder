import React, {Component} from 'react'
import Button from '../../UI/Button/Button'


interface Props {
  ingredients: {
    [key:string]: number;
  },
  price:number,
  purchaseCanceled: any,
  purchaseContinued: any
}

class OrderSummary extends Component<Props> {
  componentWillUpdate(){
    //console.log('[OrderSummary] will update')
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>
            :{this.props.ingredients[igKey]}
          </li>
        )
      })

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious subway with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </>
    )
  }

}

export default OrderSummary
