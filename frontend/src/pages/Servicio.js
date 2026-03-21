import { useEffect, useState } from "react";

function Servicio() {
  const [servicios, setServicios] = useState([]);
  const [servicioId, setServicioId] = useState("");
  const [tipoServicioId, setTipoServicioId] = useState("");
  const [nombreServicio, setNombreServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerServicios = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/servicio");
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const limpiarFormulario = () => {
    setServicioId("");
    setTipoServicioId("");
    setNombreServicio("");
    setDescripcion("");
    setPrecioBase("");
    setEditandoId(null);
  };

  const guardarServicio = async () => {
    try {
      const datos = {
        servicio_id: servicioId,
        tipo_servicio_id: tipoServicioId,
        nombre_servicio: nombreServicio,
        descripcion,
        precio_base: precioBase,
      };

      if (editandoId) {
        await fetch(`http://localhost:3001/api/servicio/${editandoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_servicio_id: tipoServicioId,
            nombre_servicio: nombreServicio,
            descripcion,
            precio_base: precioBase,
          }),
        });
      } else {
        await fetch("http://localhost:3001/api/servicio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
      }

      limpiarFormulario();
      obtenerServicios();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  const editarServicio = (servicio) => {
    setServicioId(servicio.servicio_id);
    setTipoServicioId(servicio.tipo_servicio_id || "");
    setNombreServicio(servicio.nombre_servicio || "");
    setDescripcion(servicio.descripcion || "");
    setPrecioBase(servicio.precio_base || "");
    setEditandoId(servicio.servicio_id);
  };

  const eliminarServicio = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/servicio/${id}`, {
        method: "DELETE",
      });

      obtenerServicios();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD - Servicios</h2>

      <div style={{ marginBottom: "20px" }}>
        {!editandoId && (
          <input
            type="number"
            placeholder="ID Servicio"
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        )}

        <input
          type="number"
          placeholder="ID Tipo Servicio"
          value={tipoServicioId}
          onChange={(e) => setTipoServicioId(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Nombre Servicio"
          value={nombreServicio}
          onChange={(e) => setNombreServicio(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Precio Base"
          value={precioBase}
          onChange={(e) => setPrecioBase(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={guardarServicio}>
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
            <th>Tipo Servicio ID</th>
            <th>Nombre Servicio</th>
            <th>Descripción</th>
            <th>Precio Base</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <tr key={servicio.servicio_id}>
                <td>{servicio.servicio_id}</td>
                <td>{servicio.tipo_servicio_id}</td>
                <td>{servicio.nombre_servicio}</td>
                <td>{servicio.descripcion}</td>
                <td>{servicio.precio_base}</td>
                <td>
                  <button onClick={() => editarServicio(servicio)}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarServicio(servicio.servicio_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Servicio;