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

interface State {
  orderForm: {
    [key:string]: Input
  },
  loading: boolean
}

interface Input {
  elementType: string,
  elementConfig: object,
  value: string
}

class ContactData extends Component<Props, State> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Casper'
        },
        value: ''
      },
      street1: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234 Cat Street'
        },
        value: ''
      },
      street2: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Apt 222'
        },
        value: ''
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'tel',
          placeholder: '(123)888-7777'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value:'fastest', display:'Fastest'},
            {value:'cheapest', display:'Cheapest'}
          ]
        },
        value: ''
      },
    },
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
    const formElementsArray:Array<{id:string, config:Input}> = []
    for(let key in this.state.orderForm){
      /*
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Casper'
      },
      value: ''
      */

      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key.toString()]
      })
    }
    let form = (
      <form>
        <Input elementType="input" elementConfig />
        {formElementsArray.map(formElement => {
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}/>
          })
        }
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
