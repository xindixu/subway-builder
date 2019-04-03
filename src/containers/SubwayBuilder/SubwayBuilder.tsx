import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import axios from '../../axios-orders'

interface State {
  ingredients: {
    [key:string]: number;
  },
  prices: {
    [key:string]: number;
  },
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
}

interface Props {
  history:any
}

class SubwayBuilder extends Component<Props, State>{
  state: State = {
    ingredients: {},
    prices: {
      salad: 0.5,
      cheese: 0.5,
      meat: 1.5,
      bacon: 0.7
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    console.log(this.props)
      axios.get('https://subway-builder.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {})
  }

  addIngredientHandler = (type:string) => {
    const updatedCount = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    const priceAddition = this.state.prices[type]
    const newPrice = this.state.totalPrice + priceAddition
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type:string) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0){
      return
    }
    const updatedCount =  oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    const priceDeduction = this.state.prices[type]
    const newPrice = this.state.totalPrice - priceDeduction
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  updatePurchaseState(ingredients:{[key:string]:number}){
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum,el) => {
      return sum + el
    },0)

    this.setState({purchasable: sum > 0})
  }

  purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = () => {
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Xindi Xu',
    //     address: {
    //       street1: '1234 Casper',
    //       street2: 'Apt 22',
    //     },
    //     phone: '5127732222'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    //
    // axios.post('/orders.json', order)
    // .then(response => {
    //   this.setState({loading:false, purchasing: false})
    // })
    // .catch(error => {
    //   this.setState({loading:false, purchasing: false})
    // })

    const queryParams = []
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i].toString()))
    }
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname:'/checkout',
      search: queryString
    })
  }

  render() {
    const disabledInfo:any = {
      ...this.state.ingredients
    }

    for(let key in disabledInfo){
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    let orderSummary = <Spinner />


    let sandwich = <Spinner />
    if(this.state.ingredients != null){
       sandwich = (
         <Aux>
          <Sandwich ingredients={this.state.ingredients}/>
          <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      )
    }

    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return (
      <Aux>
        {sandwich}
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

      </Aux>
    )
  }
}

export default WithErrorHandler(SubwayBuilder, axios)
