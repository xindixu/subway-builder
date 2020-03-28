import { Reducer } from 'redux';
import * as types from './action'

export interface SubwayState {
  ingredients: {
    [key: string]: number;
  },
  prices: {
    [key: string]: number;
  },
  totalPrice: number;
}


const initState: SubwayState = {
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
  totalPrice: 3
}

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + state.prices[action.ingredient]
      }
    case types.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - state.prices[action.ingredient]

      }
    default:
      return state

  }
}

export default reducer;