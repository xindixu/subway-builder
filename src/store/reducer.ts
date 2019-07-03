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
  prices: null,
  totalPrice: 0
}

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      }
    case types.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      }
    default:
      return state

  }
}

export default reducer;