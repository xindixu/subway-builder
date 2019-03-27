import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import SubwayBuilder from './containers/SubwayBuilder/SubwayBuilder'



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SubwayBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
