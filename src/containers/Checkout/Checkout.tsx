import React, {Component} from 'react'
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

interface Props {
  history: any,
  location: any,
  match: any
}

interface ingredients {
  [key: string]: number;
}

interface State {
  ingredients: {
    [key: string]: number;
  },
  price: number
}

class Checkout extends Component<Props, State> {
  state = {
    ingredients: {  },
    price: 0
  }

  componentWillMount(){
      const query = new URLSearchParams(this.props.location.search)
      const ingredients:ingredients = {}

      for(let param of query.entries()){
        if(param[0] === 'price'){
          this.setState({price: +(param[1])})
        }
        else{
          ingredients[param[0]] = +(param[1])
        }
      }

      this.setState({ingredients:ingredients})

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
        <Route
          path={this.props.match.path + '/contact'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
      </div>
    )
  }
}

export default Checkout
