import React from 'react'
import styles from './RoundButtonLeft.module.scss'

interface IProps {
  onClick?: () => void
  children: React.ReactNode
}
const RoundButtonLeft = ({ children, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default RoundButtonLeft
