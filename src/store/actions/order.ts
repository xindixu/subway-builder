import * as types from './actionTypes'
import axios from '../../axios-orders'

export const purchaseSuccess = (id, orderData) => {
  return {
    type: types.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseFail = (error) => {
  return {
    type: types.PURCHASE_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: types.PURCHASE_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios
      .post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseFail(error))

      })
  }
}