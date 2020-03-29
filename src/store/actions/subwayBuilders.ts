import * as types from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
  return {
    type: types.ADD_INGREDIENT,
    ingredient: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: types.REMOVE_INGREDIENT,
    ingredient: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: types.SET_INGREDIENTS,
    ingredients: ingredients
  }
}


export const fetchIngredientsFailed = () => {
  return {
    type: types.FETCH_INGREDIENTS_FAIL,
  }
}

export const initIngredients = () => {
  return dispatch => {
        axios.get('https://subway-builder.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {dispatch(fetchIngredientsFailed())})
  }
}