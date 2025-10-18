import { useState } from 'react'
import './App.css'

function Counter(){
  const [count, setCount] = useState(0)

  return (
  <>
    <button onClick={()=>{setCount(prev => prev + 1)}}>
      Click me
    </button>
    <div>{count}</div>
  </>
  )
}

function App() {
 

  return (
    <>
      <div>
        Hello From app  
      </div>
      <Counter />

    </>
  )
}

export default App
