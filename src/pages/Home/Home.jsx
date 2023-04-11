import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import MainMap from '../../components/map'
import MainGraph from '../../components/graph'

function Home() {
  const [useMap, setUseMap] = useState(true)
  return (
    <>
      <Navbar />
      {
        useMap ?
          <MainMap/> :
          <MainGraph/>
      }
    </>
  )
}

export default Home