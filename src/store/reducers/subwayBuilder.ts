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

const addIngredient = (state, action) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  },
  totalPrice: state.totalPrice + state.prices[action.ingredient]
})

const removeIngredient = (state, action) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  },
  totalPrice: state.totalPrice - state.prices[action.ingredient]
})

const setIngredients = (state, action) => ({
  ...state,
  ingredients: action.ingredients,
  error: false,
  totalPrice: 3
})

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return addIngredient(state, action)
    case types.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case types.SET_INGREDIENTS:
      return setIngredients(state, action)
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