import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import {isEmpty} from '../../utils'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

interface ingredients {
    [key: string]: number
}
interface Props {
    history: any
    location: any
    match: any,
    ingredients: ingredients
    price: number
}

class Checkout extends Component<Props> {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact')
    }

    render() {
        let summary = <Redirect to="/" />
        if (!isEmpty(this.props.ingredients)) {

            summary = (
                <>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={ContactData}
                    />
                </>

            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.subwayBuilder.ingredients,
        totalPrice: state.subwayBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout)
