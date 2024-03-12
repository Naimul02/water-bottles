import { useState } from 'react'

import './App.css'
import Bottles from './components/Bottles/Bottles'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header></Header>
        <Bottles></Bottles>
    
     
    </>
  )
}

export default App
