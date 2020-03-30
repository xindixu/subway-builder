import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import { purchaseSubway } from '../../../store/actions'

interface Props {
  ingredients: any
  totalPrice: number
  history: any
  loading: boolean
  onOrderSubway: Function
}

interface State {
  orderForm: {
    [key: string]: Input
  }
  formIsValid: boolean
}

interface Input {
  label: string
  elementType: string
  elementConfig: object
  value: string
  validation?: Validation
  valid?: boolean
  touched?: boolean
}

interface Validation {
  required?: boolean
  minLength?: number
  maxLength?: number
  isEmail?: boolean
  isNumeric?: boolean
}

class ContactData extends Component<Props, State> {
  state = {
    orderForm: {
      name: {
        label: 'Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Casper',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street1: {
        label: 'Address Line 1',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234 Cat Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street2: {
        label: 'Address Line 2',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Apt 222',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      phone: {
        label: 'Phone Number',
        elementType: 'input',
        elementConfig: {
          type: 'tel',
          placeholder: '(123)888-7777',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        label: 'Delivery Method',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  }

  orderHandler = (event: any) => {
    event.preventDefault()

    const contact = {}
    for (let name in this.state.orderForm) {
      contact[name] = this.state.orderForm[name].value
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      contact: contact,
    }
    this.props.onOrderSubway(order)
  }

  checkValidity = (value: string, rules: Validation) => {
    let isValid = false
    if (rules.required) {
      isValid = value.trim() !== ''
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }
    return isValid
  }

  inputChangedHandler = (event: any, inputIdentifier: string) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid =
        updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({ formIsValid: formIsValid })
  }

  render() {
    const formElementsArray: Array<{ key: string; config: Input }> = []
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
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event: any) => {
                this.inputChangedHandler(event, formElement.key)
              }}
            />
          )
        })}
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={styles.Contact}>
        <h4>Enter your Contact Data</h4>
        {form}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.subwayBuilder.ingredients,
    totalPrice: state.subwayBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderSubway: (orderData) => dispatch(purchaseSubway(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
