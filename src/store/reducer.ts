import { Reducer } from 'redux';
import * as actionTypes from './action'

export interface SubwayState {
    ingredients: {
      [key:string]: number;
    },
    prices: {
      [key:string]: number;
    },
    totalPrice: number;
}
  

const initState:SubwayState = { 
    ingredients: null,
    prices: null,
    totalPrice: 0
}

const reducer = (state = initState, action:any) => {

}

export default reducer;