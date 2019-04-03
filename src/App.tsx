import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import SubwayBuilder from './containers/SubwayBuilder/SubwayBuilder'



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <SubwayBuilder/>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
