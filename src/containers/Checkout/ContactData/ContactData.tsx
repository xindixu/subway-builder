import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

interface Props {
    ingredients: any
    price: number
    history: any
}

interface State {
    orderForm: {
        [key: string]: Input
    }
    loading: boolean
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
        loading: false,
        formIsValid: false,
    }

    orderHandler = (event: any) => {
        event.preventDefault()
        this.setState({ loading: true })

        const contact = {}
        for (let name in this.state.orderForm) {
            contact[name] = this.state.orderForm[name].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contact: contact,
        }

        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    checkValidity = (value: string, rules: Validation) => {
        let isValid = false
        if (rules.required) {
            isValid = value.trim() !== ''
        }
        return isValid
    }

    inputChangedHandler = (event: any, inputIndentifier: string) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier],
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        )
        updatedFormElement.touched = true
        updatedOrderForm[inputIndentifier] = updatedFormElement
        this.setState({ orderForm: updatedOrderForm })

        let formIsValid = true
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIndentifier].valid && formIsValid
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
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                    clicked={this.orderHandler}
                >
                    ORDER
                </Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        } else {
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)
