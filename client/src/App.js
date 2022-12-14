import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Search } from './pages/search'
import { useSelector } from 'react-redux'
import RegisterProfessional from './pages/registerProfessional'
import { Perfil } from './pages/perfil'
import { Turno } from './pages/turno'
import { MyTurns } from './pages/myTurns'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh)
  
  return <>{isAuth ? <Outlet/> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh)
  
  return <>{!isAuth ? <Outlet/> : <Navigate to='/search' />}</>
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/*' element={<Home/>} />


        <Route element={<RestrictedRoutes/>}>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Route>


          <Route element={<PrivateRoutes/>}>
            <Route path='/search' element={<Search/>} />
            <Route path='/profile' element={<Perfil/>} />
            <Route path='/turn' element={<Turno/>} />
            <Route path='/list/turn' element={<MyTurns/>} />
            <Route path='/register/professional' element={<RegisterProfessional/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  ) 
}
export default App