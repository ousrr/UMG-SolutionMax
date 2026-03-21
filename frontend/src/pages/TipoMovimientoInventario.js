import { useEffect, useState } from "react";

function TipoMovimientoInventario() {
  const [tipos, setTipos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [naturaleza, setNaturaleza] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/tipos-movimiento-inventario");
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
    setNaturaleza("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/tipos-movimiento-inventario/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_tipo: nombre,
          descripcion,
          naturaleza,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/tipos-movimiento-inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_movimiento_id: id,
          nombre_tipo: nombre,
          descripcion,
          naturaleza,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (t) => {
    setId(t.tipo_movimiento_id);
    setNombre(t.nombre_tipo);
    setDescripcion(t.descripcion || "");
    setNaturaleza(t.naturaleza || "");
    setActivo(t.activo || "");
    setEditandoId(t.tipo_movimiento_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/tipos-movimiento-inventario/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Tipos de Movimiento de Inventario</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre tipo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        placeholder="Naturaleza"
        value={naturaleza}
        onChange={(e) => setNaturaleza(e.target.value)}
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
          <li key={t.tipo_movimiento_id}>
            {t.nombre_tipo} - {t.naturaleza}
            <button onClick={() => editar(t)}>Editar</button>
            <button onClick={() => eliminar(t.tipo_movimiento_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoMovimientoInventario;