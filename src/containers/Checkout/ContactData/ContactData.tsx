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
    [key: string]: Input
  },
  loading: boolean
}

interface Input {
  label:string,
  elementType: string,
  elementConfig: object,
  value: string,
  validation:object
}

class ContactData extends Component<Props, State> {
  state = {
    orderForm: {
      name: {
        label:'Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Casper'
        },
        value: '',
        validation:{
          required: true
        }
      },
      street1: {
        label: 'Address Line 1',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234 Cat Street'
        },
        value: '',
        validation:{
          required: true
        }
      },
      street2: {
        label: 'Address Line 2',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Apt 222'
        },
        value: '',
        validation:{
          required: true
        }
      },
      phone: {
        label: 'Phone Number',
        elementType: 'input',
        elementConfig: {
          type: 'tel',
          placeholder: '(123)888-7777'
        },
        value: '',
        validation:{
          required: true
        }
      },
      deliveryMethod: {
        label: 'Delivery Method',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' }
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

    const contact = {}
    for (let name in this.state.orderForm) {
      contact[name] = this.state.orderForm[name].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      contact: contact
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

  inputChangedHandler = (event: any, inputIndentifier: string) => {
    console.log(event.target)
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIndentifier]
    }
    updatedFormElement.value = event.target.value
    updatedOrderForm[inputIndentifier] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })

  }

  render() {
    const formElementsArray: Array<{ key: string, config: Input }> = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        key: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.key}
              label={formElement.config.label}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event: any) => { this.inputChangedHandler(event, formElement.key) }} />
          )
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
