import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import {DDO, Nevermined} from '@nevermined-io/nevermined-sdk-js'
import {config} from "../config";

interface NvmProviderValue {
  DDOs: DDO[]
}

const NvmContext = createContext({} as NvmProviderValue)

function NvmProvider({ children }: {children: ReactNode}): ReactElement {

  const [nvm, setNvm] = useState<Nevermined>()
  const [consumer, setConsumer] = useState<any>()
  const [DDOs, setDDOs] = useState<DDO[]>([])

  useEffect(() => {
    const setupNvm = async () => {
      const nevermined: Nevermined = await Nevermined.getInstance(config)
      console.log(nevermined.keeper)
      setNvm(nevermined)
    }
    setupNvm()
  }, [])

  // useEffect(() => {
  //   if (nvm === undefined) return
  //   const setupConsumer = async () => {
  //     if (nvm === undefined) return
  //     let cons
  //     [cons] = await nvm.accounts.list()
  //     setConsumer(cons)
  //   }
  //   setupConsumer()
  // }, [nvm])

  useEffect(() => {
    if (nvm === undefined || consumer === undefined) return
    getNfts()
  }, [nvm, consumer])

  useEffect(() => {
    if (consumer === undefined) return
    const chargeConsumer = async () => {
      console.log(consumer)
      await consumer.requestTokens(100)
    }
    chargeConsumer()
  }, [consumer])

  const getNfts = async () => {
    if (nvm === undefined) return
    const searchQuery = {
      // offset: 0,
      // page: 0,
      query: {},
      // sort: {
      //   value: 10
      // }
    }

    try {
      const search = await nvm.assets.query(searchQuery)
      const ddos =  search.results as DDO[]
      console.log(ddos)
      setDDOs(ddos)
    } catch (error) {
    }
  }

  async function buyFromNvm(ddo: DDO) {
    if (nvm === undefined || consumer === undefined) return
    // Request some tokens from the faucet so that the consumer
    // can purchase the asset
    // console.log('doing')
    // Order the access service associated with the asset
    const service = ddo.findServiceByType('access')
    console.log(ddo)
    try {
      const agreementId = await nvm.assets.order(ddo.id, service.index, consumer)
      console.log("Order asset with service agreement id:", agreementId)
      // Now that we ordered the asset we can consume it
      const path = await nvm.assets.consume(
        agreementId,
        ddo.id,
        service.index,
        consumer,
          '/public/images/',
        undefined,
        false
      )
      console.log("File(s) downloaded to:", path)
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <NvmContext.Provider
      value={
        {
          DDOs
        } as NvmProviderValue
      }
    >
      {children}
    </NvmContext.Provider>
  )
}

const useNvm = (): NvmProviderValue => useContext(NvmContext)
export { NvmProvider, useNvm, NvmContext }
export default NvmProvider


