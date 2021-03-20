import React from 'react'
import NvmProvider from '../../context/NvmProvider'
import {SliderProvider} from "../../context/SliderProvider";

const Home: React.FC = () => {

  return (
    <NvmProvider>
      <SliderProvider>
      </SliderProvider>
    </NvmProvider>
  )
}

export default Home
