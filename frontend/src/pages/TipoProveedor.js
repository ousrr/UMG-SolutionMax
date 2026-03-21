import { useEffect, useState } from "react";

function TipoProveedor() {
  const [tipos, setTipos] = useState([]);
  const [tipoProveedorId, setTipoProveedorId] = useState("");
  const [nombreTipo, setNombreTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerTiposProveedor = async () => {
    const res = await fetch("http://localhost:3001/api/tipos-proveedor");
    const data = await res.json();
    setTipos(data);
  };

  useEffect(() => {
    obtenerTiposProveedor();
  }, []);

  const limpiar = () => {
    setTipoProveedorId("");
    setNombreTipo("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/tipos-proveedor/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_tipo: nombreTipo,
          descripcion,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/tipos-proveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_proveedor_id: tipoProveedorId,
          nombre_tipo: nombreTipo,
          descripcion,
        }),
      });
    }

    limpiar();
    obtenerTiposProveedor();
  };

  const editar = (tipo) => {
    setTipoProveedorId(tipo.tipo_proveedor_id);
    setNombreTipo(tipo.nombre_tipo);
    setDescripcion(tipo.descripcion || "");
    setEditandoId(tipo.tipo_proveedor_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/tipos-proveedor/${id}`, {
      method: "DELETE",
    });
    obtenerTiposProveedor();
  };

  return (
    <div>
      <h2>Tipos de Proveedor</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={tipoProveedorId}
          onChange={(e) => setTipoProveedorId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre tipo"
        value={nombreTipo}
        onChange={(e) => setNombreTipo(e.target.value)}
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
        {tipos.map((tipo) => (
          <li key={tipo.tipo_proveedor_id}>
            {tipo.nombre_tipo} - {tipo.descripcion}
            <button onClick={() => editar(tipo)}>Editar</button>
            <button onClick={() => eliminar(tipo.tipo_proveedor_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoProveedor;