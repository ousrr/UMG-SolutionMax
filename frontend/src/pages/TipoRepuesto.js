import { useEffect, useState } from "react";

function TipoRepuesto() {
  const [tipos, setTipos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/tipos-repuesto");
    const data = await res.json();
    setTipos(data);
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
      await fetch(`http://localhost:3001/api/tipos-repuesto/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_tipo: nombre,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/tipos-repuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_repuesto_id: id,
          nombre_tipo: nombre,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (t) => {
    setId(t.tipo_repuesto_id);
    setNombre(t.nombre_tipo);
    setDescripcion(t.descripcion || "");
    setActivo(t.activo || "");
    setEditandoId(t.tipo_repuesto_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/tipos-repuesto/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Tipos de Repuesto</h2>

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

      <input
        placeholder="Activo"
        value={activo}
        onChange={(e) => setActivo(e.target.value)}
      />

      <button onClick={guardar}>
        {editandoId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {tipos.map((t) => (
          <li key={t.tipo_repuesto_id}>
            {t.nombre_tipo}
            <button onClick={() => editar(t)}>Editar</button>
            <button onClick={() => eliminar(t.tipo_repuesto_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoRepuesto;