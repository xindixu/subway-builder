import React from 'react';

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'

class ContactData extends React.Component {
  state = {
    name: '',
    address: {
      street1: '',
      street2: '',
    },
    phone: ''
  }

  render() {
    return (
      <div>
        <h4>Enter your Contact Data</h4>
        <form>
          <label>
            Name:
            <input type="text" name="name" placeholder="Capser"/>
          </label>
          <label>
            Address 1:
            <input type="text" name="address1" placeholder="1234 Cat Street"/>
          </label>
          <label>
            Address 2:
            <input type="text" name="address2" placeholder="Apt 111"/>
          </label>
          <label>
            Phone:
            <input type="phone" name="phone" placeholder="(123)773-2039"/>
          </label>
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;
