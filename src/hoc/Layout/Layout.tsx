import React, {Component} from 'react'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


interface State {
  showSideDrawer: boolean;
}

class Layout extends Component {
  state:State = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer:false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState:State) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return (
      <>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </>
    )
  }

}

export default Layout
