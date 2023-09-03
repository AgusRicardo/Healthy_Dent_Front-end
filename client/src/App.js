import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Search } from "./pages/search";
import { useSelector } from "react-redux";
import RegisterProfessional from "./pages/registerProfessional";
import { Perfil } from "./pages/perfil";
import { Turno } from "./pages/turno";
import { MyTurns } from "./pages/myTurns";
import { Inicio } from "./pages/inicio";
import { Agenda } from "./pages/agenda";
import { Estadisticas } from "./pages/estadisticas";
import { PerfilProfessional } from "./pages/perfilProfessional";
import { MisPacientes } from "./pages/misPacientes";


const PacienteRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh);
  const tipo = localStorage.getItem("tipo");

  return <>{isAuth && tipo === "Paciente" ? <Outlet /> : <Navigate to="/login" />}</>;
};

const ProfessionalRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh);
  const tipo = localStorage.getItem("tipo");

  return <>{isAuth && tipo === "Profesional" ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.authh);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/inicio" />}</>;
};

const App = () => {
  const { isAuth } = useSelector((state) => state.authh);
  const tipo = localStorage.getItem("tipo");

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route element={<RestrictedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* RUTAS DEL PACIENTE */}
        {isAuth && tipo === "Paciente" ? (
          <Route element={<PacienteRoutes />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Perfil />} />
            <Route path="/turn" element={<Turno />} />
            <Route path="/list/turn" element={<MyTurns />} />
            <Route path="/register/professional" element={<RegisterProfessional />}/>
          </Route>
        ) : (
          <Route path="/" element={<Home />} />
        )}

        {/* RUTAS DEL PROFESIONAL */}
        {isAuth && tipo === "Profesional" ? (
          <Route element={<ProfessionalRoutes />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/calendar" element={<Agenda />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/perfilProfessional" element={<PerfilProfessional />} />
            <Route path="/misPacientes" element={<MisPacientes />} />
            

          </Route>
        ) : (
          <Route path="/" element={<Home />} />
        )}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
