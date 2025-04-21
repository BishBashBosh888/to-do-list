import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
// import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route path='*' element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
