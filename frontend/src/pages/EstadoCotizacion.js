import { useEffect, useState } from "react";

function EstadoCotizacion() {
  const [estados, setEstados] = useState([]);
  const [estadoCotizacionId, setEstadoCotizacionId] = useState("");
  const [nombreEstado, setNombreEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerEstadosCotizacion = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/estado-cotizacion");
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al obtener estados de cotización:", error);
    }
  };

  useEffect(() => {
    obtenerEstadosCotizacion();
  }, []);

  const limpiarFormulario = () => {
    setEstadoCotizacionId("");
    setNombreEstado("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardarEstadoCotizacion = async () => {
    try {
      const datos = {
        estado_cotizacion_id: estadoCotizacionId,
        nombre_estado: nombreEstado,
        descripcion: descripcion,
      };

      if (editandoId) {
        await fetch(`http://localhost:3001/api/estado-cotizacion/${editandoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_estado: nombreEstado,
            descripcion: descripcion,
          }),
        });
      } else {
        await fetch("http://localhost:3001/api/estado-cotizacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
      }

      limpiarFormulario();
      obtenerEstadosCotizacion();
    } catch (error) {
      console.error("Error al guardar estado de cotización:", error);
    }
  };

  const editarEstadoCotizacion = (estado) => {
    setEstadoCotizacionId(estado.estado_cotizacion_id);
    setNombreEstado(estado.nombre_estado || "");
    setDescripcion(estado.descripcion || "");
    setEditandoId(estado.estado_cotizacion_id);
  };

  const eliminarEstadoCotizacion = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/estado-cotizacion/${id}`, {
        method: "DELETE",
      });

      obtenerEstadosCotizacion();
    } catch (error) {
      console.error("Error al eliminar estado de cotización:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD - Estado de Cotización</h2>

      <div style={{ marginBottom: "20px" }}>
        {!editandoId && (
          <input
            type="number"
            placeholder="ID"
            value={estadoCotizacionId}
            onChange={(e) => setEstadoCotizacionId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        )}

        <input
          type="text"
          placeholder="Nombre del estado"
          value={nombreEstado}
          onChange={(e) => setNombreEstado(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={guardarEstadoCotizacion}>
          {editandoId ? "Actualizar" : "Guardar"}
        </button>

        {editandoId && (
          <button onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
            Cancelar
          </button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.length > 0 ? (
            estados.map((estado) => (
              <tr key={estado.estado_cotizacion_id}>
                <td>{estado.estado_cotizacion_id}</td>
                <td>{estado.nombre_estado}</td>
                <td>{estado.descripcion}</td>
                <td>
                  <button onClick={() => editarEstadoCotizacion(estado)}>
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      eliminarEstadoCotizacion(estado.estado_cotizacion_id)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoCotizacion;