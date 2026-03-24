import React from "react";
import "./App.css";

import EstadosRepuestoPage from "./pages/EstadosRepuestoPage";
import UnidadesMedidaPage from "./pages/UnidadesMedidaPage";
import MarcasRepuestoPage from "./pages/MarcasRepuestoPage";
import TiposRepuestoPage from "./pages/TiposRepuestoPage";
import TiposMovimientoInventarioPage from "./pages/TiposMovimientoInventarioPage";
import MotivosAjusteInventarioPage from "./pages/MotivosAjusteInventarioPage";
import EstadosOrdenCompraPage from "./pages/EstadosOrdenCompraPage";
import EstadosTareaPage from "./pages/EstadosTareaPage";
import FormasPagoPage from "./pages/FormasPagoPage";
import EstadosPagoPage from "./pages/EstadosPagoPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Solution Max</h1>
  
   <h2>Estados de Repuesto</h2>
<EstadosRepuestoPage />
<hr />

<h2>Unidades de Medida</h2>
<UnidadesMedidaPage />
<hr />

<h2>Marcas de Repuesto</h2>
<MarcasRepuestoPage />
<hr />
<h2>Tipos de Repuesto</h2>
<TiposRepuestoPage />
<hr />

<h2>Tipos de Movimiento de Inventario</h2>
<TiposMovimientoInventarioPage />
<hr />
<h2>Motivos de Ajuste de Inventario</h2>
<MotivosAjusteInventarioPage />
<hr />
<h2>Estados de Orden de Compra</h2>
<EstadosOrdenCompraPage />
<hr />
<h2>Estados de Tarea</h2>
<EstadosTareaPage />
<hr />
<h2>Formas de Pago</h2>
<FormasPagoPage />
<hr />
<h2>Estados de Pago</h2>
<EstadosPagoPage />
<hr />

    </div>
  );

}

export default App;