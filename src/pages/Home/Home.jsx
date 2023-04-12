import React, { useEffect, useState } from 'react'
import MainMap from '../../components/map'
import MainGraph from '../../components/graph'
import { useAppStore } from '../../store'
import Sidebar from '../../components/sidebar'

function Home() {
  const useMap = useAppStore((state) => state.useMap)
  return (
    <>
      <Sidebar/>
      {
        useMap ?
          <MainMap/> :
          <MainGraph/>
      }
    </>
  )
}

export default Home