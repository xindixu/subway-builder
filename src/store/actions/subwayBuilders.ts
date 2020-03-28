import * as types from './actionTypes'

export const addIngredient = (name) => {
  console.log(name)
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