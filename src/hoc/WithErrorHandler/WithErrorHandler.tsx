import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'

interface State {
  error: any
}


const WithErrorHandler = (WrappedComponent:any, axios:any) => {
  return class extends Component {
    state:State = {
      error:null
    }
    reqInterceptor:any
    resInterceptor:any


    componentWillMount = () => {
      this.reqInterceptor = axios.interceptors.request.use((req:any) => {
        this.setState({error: null})
        return req
      })

      this.resInterceptor = axios.interceptors.response.use((res:any)=>res, (error:any)=> {
        this.setState({error: error})
      })
    }

    componentWillUnmount(){
      console.log('will unmount')
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <>
          <Modal show={this.state.error != null}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error == null ? null : this.state.error.message}
          </Modal>
            <WrappedComponent {...this.props}/>
        </>
      )
    }
  }
}

export default WithErrorHandler
