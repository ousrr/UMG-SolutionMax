import EstadoCliente from "./pages/EstadoCliente";
import EstadoCotizacion from "./pages/EstadoCotizacion";
import EstadoAprobacion from "./pages/EstadoAprobacion";
import Prioridad from "./pages/Prioridad";
import Servicio from "./pages/Servicio";
import CategoriaRepuesto from "./pages/CategoriaRepuesto";
import TipoProveedor from "./pages/TipoProveedor";
import EstadoProveedor from "./pages/EstadoProveedor";
import CondicionPagoProveedor from "./pages/CondicionPagoProveedor";
import EstadoRepuesto from "./pages/EstadoRepuesto";
import UnidadMedida from "./pages/UnidadMedida";
import MarcaRepuesto from "./pages/MarcaRepuesto";
import TipoRepuesto from "./pages/TipoRepuesto";
import TipoMovimientoInventario from "./pages/TipoMovimientoInventario";
import MotivoAjusteInventario from "./pages/MotivoAjusteInventario";
import EstadoOrdenCompra from "./pages/EstadoOrdenCompra";
import EstadoTarea from "./pages/EstadoTarea";
import FormaPago from "./pages/FormaPago";
import EstadoPago from "./pages/EstadoPago";

function App() {
  return (
    <div>
      <h1>Solution Max</h1>

      <h2>Estado Cliente</h2>
      <EstadoCliente />

      <hr />

      <h2>Estado Cotizacion</h2>
      <EstadoCotizacion />

      <hr />

      <h2>Estado Aprobacion</h2>
      <EstadoAprobacion />

      <hr />

      <h2>Prioridad</h2>
      <Prioridad />

      <hr />

      <h2>Servicio</h2>
      <Servicio />

      <hr />

      <h2>Categoria Repuesto</h2>
      <CategoriaRepuesto />

      <hr />

      <h2>Tipo Proveedor</h2>
      <TipoProveedor />

      <hr />

      <h2>Estado Proveedor</h2>
      <EstadoProveedor />

      <hr />

      <h2>Condicion Pago Proveedor</h2>
      <CondicionPagoProveedor />

      <hr />

      <h2>Estado Repuestos</h2>
      <EstadoRepuesto />

      <hr />

      <h2>Unidad Medidas</h2>
      <UnidadMedida />

    
      <hr />

      <h2>Marca repuestos</h2>
      <MarcaRepuesto />

      <hr />

      <h2>Tipos Repuesto</h2>
      <TipoRepuesto />

      <hr />

      <h2>Tipo Movimiento Inventario</h2>
      <TipoMovimientoInventario />

      <hr />

      <h2>Motivo Ajustes Inventario</h2>
      <MotivoAjusteInventario />

      <hr />

      <h2>Estado Orden Compras</h2>
      <EstadoOrdenCompra />

      <hr />

      <h2>Estado Tareas</h2>
      <EstadoTarea />

      <hr />

      <h2>Formas Pago</h2>
      <FormaPago />

      <hr />

      <h2>Estado Pagos</h2>
      <EstadoPago />

    </div>
  );
}

export default App;