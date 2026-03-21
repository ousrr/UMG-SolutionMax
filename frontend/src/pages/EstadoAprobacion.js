import { useEffect, useState } from "react";

function EstadoAprobacion() {
  const [estados, setEstados] = useState([]);
  const [estadoAprobacionId, setEstadoAprobacionId] = useState("");
  const [nombreEstado, setNombreEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerEstadosAprobacion = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/estado-aprobacion");
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al obtener estados de aprobación:", error);
    }
  };

  useEffect(() => {
    obtenerEstadosAprobacion();
  }, []);

  const limpiarFormulario = () => {
    setEstadoAprobacionId("");
    setNombreEstado("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardarEstadoAprobacion = async () => {
    try {
      const datos = {
        estado_aprobacion_id: estadoAprobacionId,
        nombre_estado: nombreEstado,
        descripcion: descripcion,
      };

      if (editandoId) {
        await fetch(`http://localhost:3001/api/estado-aprobacion/${editandoId}`, {
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
        await fetch("http://localhost:3001/api/estado-aprobacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
      }

      limpiarFormulario();
      obtenerEstadosAprobacion();
    } catch (error) {
      console.error("Error al guardar estado de aprobación:", error);
    }
  };

  const editarEstadoAprobacion = (estado) => {
    setEstadoAprobacionId(estado.estado_aprobacion_id);
    setNombreEstado(estado.nombre_estado || "");
    setDescripcion(estado.descripcion || "");
    setEditandoId(estado.estado_aprobacion_id);
  };

  const eliminarEstadoAprobacion = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/estado-aprobacion/${id}`, {
        method: "DELETE",
      });

      obtenerEstadosAprobacion();
    } catch (error) {
      console.error("Error al eliminar estado de aprobación:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD - Estado de Aprobación</h2>

      <div style={{ marginBottom: "20px" }}>
        {!editandoId && (
          <input
            type="number"
            placeholder="ID"
            value={estadoAprobacionId}
            onChange={(e) => setEstadoAprobacionId(e.target.value)}
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

        <button onClick={guardarEstadoAprobacion}>
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
              <tr key={estado.estado_aprobacion_id}>
                <td>{estado.estado_aprobacion_id}</td>
                <td>{estado.nombre_estado}</td>
                <td>{estado.descripcion}</td>
                <td>
                  <button onClick={() => editarEstadoAprobacion(estado)}>
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      eliminarEstadoAprobacion(estado.estado_aprobacion_id)
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

export default EstadoAprobacion;