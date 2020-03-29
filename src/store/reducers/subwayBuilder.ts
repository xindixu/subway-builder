import * as types from '../actions/actionTypes'

export interface SubwayState {
  ingredients: {
    [key: string]: number;
  },
  prices: {
    [key: string]: number;
  },
  totalPrice: number,
  error: boolean
}


const initState: SubwayState = {
  ingredients: {},
  prices: {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.7
  },
  totalPrice: 3,
  error: false
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
    
    case types.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice:  3
      }
  
      case types.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer;