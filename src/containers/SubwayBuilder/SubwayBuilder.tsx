import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary'


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
}

class SubwayBuilder extends Component{
  state: State = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    prices: {
      salad: 0.5,
      cheese: 0.5,
      meat: 1.5,
      bacon: 0.7
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false
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
    alert("Checking out!!!")
  }

  render() {
    const disabledInfo:any = {
      ...this.state.ingredients
    }

    for(let key in disabledInfo){
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
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
  }
}

export default SubwayBuilder
