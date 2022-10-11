import { BrowserRouter, Navigate, Routes, Route, Outlet, useParams } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Search } from './pages/search'
import { useSelector } from 'react-redux'
import RegisterProfessional from './pages/registerProfessional'
import { Perfil } from './pages/perfil'
import { Turno } from './pages/turno'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh)
  
  
  return <>{isAuth.status ? <Outlet/> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh)
  
  return <>{!isAuth.status ? <Outlet/> : <Navigate to='/search' />}</>
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
          <Route path='/register/professional' element={<RegisterProfessional/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  ) 
}
export default App