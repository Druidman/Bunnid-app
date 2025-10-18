import { useState } from 'react'
import './App.css'

function Counter({max}){
  const [count, setCount] = useState(0)

  return (
  <>
    <button onClick={()=>{setCount(prev => {
      if (prev + 1 == max){
        return 0
      }
      return prev + 1
    })}}>
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
      <Counter max={10}/>
      <Counter max={2}/>
      <Counter max={100}/>
      <Counter max={20}/>

    </>
  )
}

export default App
