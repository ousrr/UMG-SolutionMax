import { useEffect, useState } from "react";

function Prioridad() {
  const [prioridades, setPrioridades] = useState([]);
  const [prioridadId, setPrioridadId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nivel, setNivel] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerPrioridades = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/prioridad");
      const data = await response.json();
      setPrioridades(data);
    } catch (error) {
      console.error("Error al obtener prioridades:", error);
    }
  };

  useEffect(() => {
    obtenerPrioridades();
  }, []);

  const limpiarFormulario = () => {
    setPrioridadId("");
    setNombre("");
    setNivel("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardarPrioridad = async () => {
    try {
      const datos = {
        prioridad_id: prioridadId,
        nombre,
        nivel,
        descripcion,
      };

      if (editandoId) {
        await fetch(`http://localhost:3001/api/prioridad/${editandoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            nivel,
            descripcion,
          }),
        });
      } else {
        await fetch("http://localhost:3001/api/prioridad", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
      }

      limpiarFormulario();
      obtenerPrioridades();
    } catch (error) {
      console.error("Error al guardar prioridad:", error);
    }
  };

  const editarPrioridad = (prioridad) => {
    setPrioridadId(prioridad.prioridad_id);
    setNombre(prioridad.nombre || "");
    setNivel(prioridad.nivel || "");
    setDescripcion(prioridad.descripcion || "");
    setEditandoId(prioridad.prioridad_id);
  };

  const eliminarPrioridad = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/prioridad/${id}`, {
        method: "DELETE",
      });

      obtenerPrioridades();
    } catch (error) {
      console.error("Error al eliminar prioridad:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD - Prioridades</h2>

      <div style={{ marginBottom: "20px" }}>
        {!editandoId && (
          <input
            type="number"
            placeholder="ID"
            value={prioridadId}
            onChange={(e) => setPrioridadId(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        )}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Nivel"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={guardarPrioridad}>
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
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prioridades.length > 0 ? (
            prioridades.map((prioridad) => (
              <tr key={prioridad.prioridad_id}>
                <td>{prioridad.prioridad_id}</td>
                <td>{prioridad.nombre}</td>
                <td>{prioridad.nivel}</td>
                <td>{prioridad.descripcion}</td>
                <td>
                  <button onClick={() => editarPrioridad(prioridad)}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarPrioridad(prioridad.prioridad_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Prioridad;