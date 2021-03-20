import React from 'react'
import styles from './RoundButton.module.scss'

interface IProps {
  onClick?: () => void
  children: React.ReactNode
}
const RoundButton = ({ children, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default RoundButton
