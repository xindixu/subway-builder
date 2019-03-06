import React from 'react'
import styles from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props:any) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={styles.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100px)',
        opacity: props.show ? 1 : 0
      }}>
      {props.children}
    </div>
  </Aux>
)

export default Modal
