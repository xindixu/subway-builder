import React from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'


class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount(){
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders=[]
        for(let key in response.data){
          fetchedOrders.push(
            {...response.data[key],
              id:key
            }
          )
        }
        this.setState({loading: false, orders: fetchedOrders})
        console.log(this.state.orders)
      })
      .catch(error => {
        this.setState({loading: false})
      })
  }
  render() {
    return(
      <div>
        {this.state.orders.map((order:any) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    )

  }
}

export default WithErrorHandler(Orders, axios)
