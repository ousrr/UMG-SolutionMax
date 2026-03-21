import React from "react";
import Roles from "./pages/Roles";
import NivelCombustible from "./pages/NivelCombustible";
import ItemRevision from "./pages/ItemRevision";
import Horarios from "./pages/Horarios";
import TipoCita from "./pages/TipoCita";
import EstadoCita from "./pages/EstadoCita";
import TipoCliente from "./pages/TipoCliente";
import EstadoCliente from "./pages/EstadoCliente";
import TipoTelefono from "./pages/TipoTelefono";
import Pais from "./pages/Pais";
import Departamento from "./pages/Departamento";
import Municipio from "./pages/Municipio";
import MarcaVehiculo from "./pages/MarcaVehiculo";
import TiposVehiculos from "./pages/TiposVehiculos";
import ColorVehiculo from "./pages/ColorVehiculo";
import CombustibleVehiculo from "./pages/CombustibleVehiculo";
import TipoServicio from "./pages/TipoServicio";
import SistemaVehiculo from "./pages/SistemaVehiculo";
import EstadoFisico from "./pages/EstadoFisico";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Solution Max</h1>

      <Roles />
      <hr />
      <NivelCombustible />
      <hr />
      <ItemRevision />
      <hr />
      <Horarios />
      <hr />
      <TipoCita />
      <hr />
      <EstadoCita />
      <hr />
      <TipoCliente />
      <hr />
      <EstadoCliente />
      <hr />
      <TipoTelefono />
      <hr />
      <Pais />
      <hr />
      <Departamento />
      <hr />
      <Municipio />
      <hr />
      <MarcaVehiculo />
      <hr />
      <TiposVehiculos />
      <hr />
      <ColorVehiculo />
      <hr />
      <CombustibleVehiculo />
      <hr />
      <TipoServicio />
      <hr />
      <SistemaVehiculo />
      <hr />
      <EstadoFisico />
    </div>
  );
}

export default App;