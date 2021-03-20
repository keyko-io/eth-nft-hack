import React from 'react'
import styles from './EyeButton.module.scss'


interface IProps {
    onClick?: () => void 
}

const EyeButton: React.FC<IProps> = ({children, onClick}) => {
    return(
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default EyeButton