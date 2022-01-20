import { Routes, Route, Link } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import ChildOther from "./pages/childOther"
import ChildAbout from "./pages/childAbout"

import "./App.css"
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='about' element={<ChildAbout />} />
          <Route path='other' element={<ChildOther />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
