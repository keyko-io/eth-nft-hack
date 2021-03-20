import React from 'react'
import {useNvm} from '../../context/NvmProvider'
import Carousel from '../molecules/Carousel/Carousel'
import styles from './Gridplaceholder.module.scss'
import ProgressBar from "@ramonak/react-progress-bar";

const GridPlaceHolder: React.FC = () => {
  const {DDOs} = useNvm()
  return (
    <div className={styles.placeholder}>
      <div className={styles.verticalCenter}></div>
      <Carousel ddos={DDOs}/>
    </div>
  )
}

export default GridPlaceHolder
