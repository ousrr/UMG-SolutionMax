import { useEffect, useState } from "react";

function EstadoTarea() {
  const [estados, setEstados] = useState([]);
  const [id, setId] = useState("");
  const [nombreEstado, setNombreEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/estados-tarea");
    const data = await res.json();
    setEstados(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombreEstado("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/estados-tarea/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_estado: nombreEstado,
          descripcion,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/estados-tarea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado_tarea_id: id,
          nombre_estado: nombreEstado,
          descripcion,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (estado) => {
    setId(estado.estado_tarea_id);
    setNombreEstado(estado.nombre_estado);
    setDescripcion(estado.descripcion || "");
    setEditandoId(estado.estado_tarea_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/estados-tarea/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Estados de Tarea</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre estado"
        value={nombreEstado}
        onChange={(e) => setNombreEstado(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button onClick={guardar}>
        {editandoId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {estados.map((estado) => (
          <li key={estado.estado_tarea_id}>
            {estado.nombre_estado}
            <button onClick={() => editar(estado)}>Editar</button>
            <button onClick={() => eliminar(estado.estado_tarea_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoTarea;