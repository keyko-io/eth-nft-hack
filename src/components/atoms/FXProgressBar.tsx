import ProgressBar from "@ramonak/react-progress-bar";
import React, {useEffect, useState} from "react";
import {useSlider} from "../../context/SliderProvider";
import styles from "./FXProgressBar.module.scss";

export const FXProgressBar = () => {
  const { progress } = useSlider()

  return (
    <div className={styles.progressDiv} style={{width: '100%'}}>
      <div style={{width: progress}} className={styles.progress}/>
    </div>
  )
}
