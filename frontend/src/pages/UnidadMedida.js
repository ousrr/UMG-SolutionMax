import { useEffect, useState } from "react";

function UnidadMedida() {
  const [unidades, setUnidades] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [abreviatura, setAbreviatura] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/unidades-medida");
    const data = await res.json();
    setUnidades(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombre("");
    setAbreviatura("");
    setDescripcion("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/unidades-medida/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_unidad: nombre,
          abreviatura,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/unidades-medida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unidad_medida_id: id,
          nombre_unidad: nombre,
          abreviatura,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (u) => {
    setId(u.unidad_medida_id);
    setNombre(u.nombre_unidad);
    setAbreviatura(u.abreviatura || "");
    setDescripcion(u.descripcion || "");
    setActivo(u.activo || "");
    setEditandoId(u.unidad_medida_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/unidades-medida/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Unidades de Medida</h2>

      {!editandoId && (
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      )}

      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Abreviatura" value={abreviatura} onChange={(e) => setAbreviatura(e.target.value)} />
      <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <input placeholder="Activo" value={activo} onChange={(e) => setActivo(e.target.value)} />

      <button onClick={guardar}>{editandoId ? "Actualizar" : "Guardar"}</button>

      <ul>
        {unidades.map((u) => (
          <li key={u.unidad_medida_id}>
            {u.nombre_unidad} ({u.abreviatura})
            <button onClick={() => editar(u)}>Editar</button>
            <button onClick={() => eliminar(u.unidad_medida_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnidadMedida;