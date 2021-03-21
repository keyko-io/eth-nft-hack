import React from 'react'
import { useDocker } from '../../../context/DockProvider'
import Button from '../../atoms/Button'
import ButtonViewGrid from '../ButtonViewGrid/ButtonViewGrid'
import styles from './BottomViewBar.module.scss'

const BottomViewBar: React.FC = () => {
  const { toggleActive } = useDocker()
  return (
    <ButtonViewGrid>
      <div className={styles.alignRight} onClick={toggleActive}>
        <Button name={'VIEW'} />
      </div>
      <div className={styles.alignLeft}>
        <Button name={'ART DETAIL'} />
      </div>
    </ButtonViewGrid>
  )
}

export default BottomViewBar
