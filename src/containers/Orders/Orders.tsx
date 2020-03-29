import React from 'react';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { fetchOrders } from '../../store/actions'

interface order {
  ingredients: {
    [key: string]: number
  },
  contact: {
    [key: string]: string
  },
  totalPrice: number,
  id: string
}

interface State { }
interface Props {
  onFetchOrders: Function
  orders: Array<order>
  loading: boolean
}


class Orders extends React.Component<Props, State> {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : this.props.orders.map((order: any) => (
          <Order
            id={order.id}
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
          />
        ))}
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios))
