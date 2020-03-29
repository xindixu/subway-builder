import * as types from '../actions/actionTypes'

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_START:
      return {
        ...state,
        loading: true
      }
    case types.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state, loading: false,
        orders: state.orders.concat(newOrder)
      }
    case types.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default reducer;