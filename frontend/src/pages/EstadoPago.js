import { useEffect, useState } from "react";

function EstadoPago() {
  const [estados, setEstados] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/estados-pago");
    const data = await res.json();
    setEstados(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombre("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/estados-pago/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/estados-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado_pago_id: id,
          nombre,
          descripcion,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (e) => {
    setId(e.estado_pago_id);
    setNombre(e.nombre);
    setDescripcion(e.descripcion || "");
    setEditandoId(e.estado_pago_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/estados-pago/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Estados de Pago</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
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
        {estados.map((e) => (
          <li key={e.estado_pago_id}>
            {e.nombre}
            <button onClick={() => editar(e)}>Editar</button>
            <button onClick={() => eliminar(e.estado_pago_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoPago;