import React, {
  createContext,
  ReactElement,
  ReactNode, useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {useNvm} from "./NvmProvider";

interface SliderProviderValue {
  currentIndex: number
  next: () => void
  prev: () => void
  progress: string
}

const SliderContext = createContext({} as SliderProviderValue)

function SliderProvider({children}: { children: ReactNode }): ReactElement {
  const [currentIndex, setIndex] = useState(0)
  const [progress, setProgress] = useState('0%')

  const { DDOs } = useNvm()

  useEffect(() => {
    if (progress === '0%') {
      setProgress('100%')
    } else {
      setProgress('0%')
    }
  }, [currentIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log()
      next()
    }, 6000);
  })

  const numberOfIndexes = (numberOfItems: number) => {
    return numberOfItems - 1
  }

  const next = () => {
    const numberOfIndex = numberOfIndexes(DDOs.length)
    const newIndex = currentIndex === numberOfIndex ? 0 : currentIndex + 1
    setIndex(newIndex)
  }

  const prev = () => {
    const numberOfIndex = numberOfIndexes(DDOs.length)
    const newIndex = currentIndex === 0 ? numberOfIndex : currentIndex - 1
    setIndex(newIndex)
  }

  return (
    <SliderContext.Provider
      value={
        {
          currentIndex,
          next,
          prev,
          progress
        } as SliderProviderValue
      }
    >
      {children}
    </SliderContext.Provider>
  )
}

const useSlider = (): SliderProviderValue => useContext(SliderContext)
export {SliderProvider, useSlider, SliderContext}
