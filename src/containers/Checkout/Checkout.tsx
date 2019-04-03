import React, {Component} from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

interface Props {
  history: any,
  location: any
}

interface ingredients {
  [key: string]: number;
}

interface State {
  ingredients: {
    [key: string]: number;
  }
}

class Checkout extends Component<Props, State> {
  state = {
    ingredients: {  }
  }

  componentDidMount(){
      const query = new URLSearchParams(this.props.location.search)
      const ingredients:ingredients = {}

      for(let param of query.entries()){
        console.log(param)
        ingredients[param[0]] = +(param[1])
      }

  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }


  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact')
  }

  render(){
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout
