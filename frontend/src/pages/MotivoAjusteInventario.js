import { useEffect, useState } from "react";

function MotivoAjusteInventario() {
  const [motivos, setMotivos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/motivos-ajuste-inventario");
    const data = await res.json();
    setMotivos(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombre("");
    setDescripcion("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/motivos-ajuste-inventario/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_motivo: nombre,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/motivos-ajuste-inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motivo_ajuste_id: id,
          nombre_motivo: nombre,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (m) => {
    setId(m.motivo_ajuste_id);
    setNombre(m.nombre_motivo);
    setDescripcion(m.descripcion || "");
    setActivo(m.activo || "");
    setEditandoId(m.motivo_ajuste_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/motivos-ajuste-inventario/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Motivos de Ajuste de Inventario</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre motivo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        placeholder="Activo"
        value={activo}
        onChange={(e) => setActivo(e.target.value)}
      />

      <button onClick={guardar}>
        {editandoId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {motivos.map((m) => (
          <li key={m.motivo_ajuste_id}>
            {m.nombre_motivo}
            <button onClick={() => editar(m)}>Editar</button>
            <button onClick={() => eliminar(m.motivo_ajuste_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MotivoAjusteInventario;