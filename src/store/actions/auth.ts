import * as types from './actionTypes'
import axios from '../../axios-orders'

export const authStart = () => {
  return {
    type: types.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: types.AUTH_SUCCESS,
    authData: authData
  }
}


export const authFail = (error) => {
  return {
    type: types.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
  }
}