import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

interface Props {
  ingredients: any,
  price: number,
  history: any
}


class ContactData extends Component<Props> {
  state = {
    name: '',
    address: {
      street1: '',
      street2: '',
    },
    phone: '',
    loading: false
  }


  orderHandler = (event: any) => {
    event.preventDefault()
    console.log(this.props.ingredients)

    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Xindi Xu',
        address: {
          street1: '1234 Casper',
          street2: 'Apt 22',
        },
        phone: '5127732222'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Capser" />
        <Input inputtype="input" type="text" name="address1" placeholder="1234 Cat Street" />
        <Input inputtype="input" type="text" name="address2" placeholder="Apt 111" />
        <Input inputtype="input" type="phone" name="phone" placeholder="(123)773-2039" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    else {

    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
