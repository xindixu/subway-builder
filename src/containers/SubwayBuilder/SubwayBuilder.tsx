import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as types from '../../store/action'

import Aux from '../../hoc/Aux'
import Sandwich from '../../components/Sandwich/Sandwich'
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Sandwich/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import axios from '../../axios-orders'

interface State {
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
}

interface Props {
  history: any,
  ingredients: {
    [key: string]: number;
  },
  totalPrice: number;

  onIngredientAdded: Function;
  onIngredientRemoved: Function;
}

class SubwayBuilder extends Component<Props, State>{
  state: State = {
    purchasable: false,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    console.log(this.props)
    // axios.get('https://subway-builder.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(error => { })
  }

  updatePurchaseState(ingredients: { [key: string]: number }) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({ purchasable: sum > 0 })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = []
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i].toString()))
    }
    queryParams.push(`price=${this.props.totalPrice}`)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    })
  }

  render() {
    const disabledInfo: any = {
      ...this.props.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    let orderSummary = <Spinner />

    let sandwich = <Spinner />
    if (this.props.ingredients != null) {
      sandwich = (
        <Aux>
          <Sandwich ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredient) => dispatch({ type: types.ADD_INGREDIENT, ingredient: ingredient }),
    onIngredientRemoved: (ingredient) => dispatch({ type: types.REMOVE_INGREDIENT, ingredient: ingredient })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(SubwayBuilder, axios))
