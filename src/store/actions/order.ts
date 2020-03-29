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

export const purchaseSubwayStart = () => {
  return {
    type: types.PURCHASE_START
  }
}

export const purchaseSubway = (orderData) => {
  return dispatch => {
    dispatch(purchaseSubwayStart())
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

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: types.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: types.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: types.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(purchaseSubwayStart())
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = []
        for (let key in response.data) {
          fetchedOrders.push(
            {
              ...response.data[key],
              id: key
            }
          )
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      })
  }
}