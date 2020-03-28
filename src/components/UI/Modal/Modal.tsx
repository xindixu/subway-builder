import React, { Component } from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

interface Props {
    show: boolean
    modalClosed: any
    children: any
}

class Modal extends Component<Props> {
    shouldComponentUpdate(nextProps: Props) {
        return (
            nextProps.show != this.props.show ||
            nextProps.children != this.props.children
        )
    }

    componentWillUpdate() {
        //console.log('[Modal] will update')
    }
    render() {
        return (
            <>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100px)',
                        opacity: this.props.show ? 1 : 0,
                    }}
                >
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal
