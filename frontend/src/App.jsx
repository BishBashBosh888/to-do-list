import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute requireAuth={true}>
            <Home/>
          </ProtectedRoute>
          }/>
        <Route path='/login' element={
          <ProtectedRoute requireAuth={false}>
            <Login/>
          </ProtectedRoute>
          }/>
        <Route path='/register' element={
          <ProtectedRoute requireAuth={false}>
            <Register/>
          </ProtectedRoute>
        }/>
        {/* <Route path='*' element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

