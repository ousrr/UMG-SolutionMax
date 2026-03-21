import { useEffect, useState } from "react";

function MarcaRepuesto() {
  const [marcas, setMarcas] = useState([]);
  const [id, setId] = useState("");
  const [nombreMarca, setNombreMarca] = useState("");
  const [paisOrigen, setPaisOrigen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/marcas-repuesto");
    const data = await res.json();
    setMarcas(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombreMarca("");
    setPaisOrigen("");
    setDescripcion("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/marcas-repuesto/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_marca: nombreMarca,
          pais_origen: paisOrigen,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/marcas-repuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marca_repuesto_id: id,
          nombre_marca: nombreMarca,
          pais_origen: paisOrigen,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (m) => {
    setId(m.marca_repuesto_id);
    setNombreMarca(m.nombre_marca);
    setPaisOrigen(m.pais_origen || "");
    setDescripcion(m.descripcion || "");
    setActivo(m.activo || "");
    setEditandoId(m.marca_repuesto_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/marcas-repuesto/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Marcas de Repuesto</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre marca"
        value={nombreMarca}
        onChange={(e) => setNombreMarca(e.target.value)}
      />

      <input
        placeholder="País origen"
        value={paisOrigen}
        onChange={(e) => setPaisOrigen(e.target.value)}
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
        {marcas.map((m) => (
          <li key={m.marca_repuesto_id}>
            {m.nombre_marca} - {m.pais_origen}
            <button onClick={() => editar(m)}>Editar</button>
            <button onClick={() => eliminar(m.marca_repuesto_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarcaRepuesto;