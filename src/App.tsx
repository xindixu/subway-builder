import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout'
import SubwayBuilder from './containers/SubwayBuilder/SubwayBuilder'
import Checkout from './containers/Checkout/Checkout'


class App extends Component {
  render() {
    return (

      <Layout>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" exact component={SubwayBuilder}/>
      </Layout>

    );
  }
}

export default App;
