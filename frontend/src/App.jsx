import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/reservations' element={<Reservations />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App