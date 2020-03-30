import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import styles from './Auth.module.css'

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

interface Props {
}

interface State {
  authForm: {
    [key: string]: Input
  }
  formIsValid: boolean
}

class Auth extends Component<Props, State> {
  state = {
    authForm: {
      email: {
        label: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'bill.gates@microsoft.com',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        label: 'Password',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: '',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
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
    return isValid
  }


  authHandler = (event: any) => {
    event.preventDefault()

    const user = {}
    for (let name in this.state.authForm) {
      user[name] = this.state.authForm[name].value
    }
  }

  inputChangedHandler = (event: any, inputIdentifier: string) => {
    const updatedAuthForm = {
      ...this.state.authForm,
    }
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier],
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )
    updatedFormElement.touched = true
    updatedAuthForm[inputIdentifier] = updatedFormElement
    this.setState({ authForm: updatedAuthForm })

    let formIsValid = true
    for (let inputIdentifier in updatedAuthForm) {
      formIsValid =
        updatedAuthForm[inputIdentifier].valid && formIsValid
    }
    this.setState({ formIsValid: formIsValid })
  }

  render() {
    const formElementsArray: Array<{ key: string; config: Input }> = []
    for (let key in this.state.authForm) {
      formElementsArray.push({
        key: key,
        config: this.state.authForm[key]
      })
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => {
          const { key, config: { label, elementType, elementConfig, value, valid, touched, validation } } = formElement
          return (
            <Input
              key={key}
              label={label}
              elementType={elementType}
              elementConfig={elementConfig}
              value={value}
              invalid={!valid}
              shouldValidate={validation}
              touched={touched}
              changed={(event: any) => {
                this.inputChangedHandler(event, key)
              }}
            />
          )
        }
        )}
      </form>
    )

    return (
      <div className={styles.Auth}>
        {form}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.authHandler}
        >
          Sign In
        </Button>
      </div>
    )
  }
}

export default Auth
