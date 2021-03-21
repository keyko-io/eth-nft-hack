import React from 'react'
import styles from './ButtonViewGrid.module.scss'

const ButtonViewGrid: React.FC = ({children}) => {
    return(
        <div className={styles.grid}>
            {children}
        </div>
    )
}

export default ButtonViewGrid