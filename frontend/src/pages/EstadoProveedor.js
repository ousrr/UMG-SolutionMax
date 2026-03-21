import { useEffect, useState } from "react";

function EstadoProveedor() {
  const [estados, setEstados] = useState([]);
  const [estadoProveedorId, setEstadoProveedorId] = useState("");
  const [nombreEstado, setNombreEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerEstadosProveedor = async () => {
    const res = await fetch("http://localhost:3001/api/estados-proveedor");
    const data = await res.json();
    setEstados(data);
  };

  useEffect(() => {
    obtenerEstadosProveedor();
  }, []);

  const limpiar = () => {
    setEstadoProveedorId("");
    setNombreEstado("");
    setDescripcion("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/estados-proveedor/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_estado: nombreEstado,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/estados-proveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado_proveedor_id: estadoProveedorId,
          nombre_estado: nombreEstado,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtenerEstadosProveedor();
  };

  const editar = (estado) => {
    setEstadoProveedorId(estado.estado_proveedor_id);
    setNombreEstado(estado.nombre_estado);
    setDescripcion(estado.descripcion || "");
    setActivo(estado.activo || "");
    setEditandoId(estado.estado_proveedor_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/estados-proveedor/${id}`, {
      method: "DELETE",
    });
    obtenerEstadosProveedor();
  };

  return (
    <div>
      <h2>Estados de Proveedor</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={estadoProveedorId}
          onChange={(e) => setEstadoProveedorId(e.target.value)}
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

      <input
        placeholder="Activo (S/N)"
        value={activo}
        onChange={(e) => setActivo(e.target.value)}
      />

      <button onClick={guardar}>
        {editandoId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {estados.map((estado) => (
          <li key={estado.estado_proveedor_id}>
            {estado.nombre_estado} - {estado.descripcion} - {estado.activo}
            <button onClick={() => editar(estado)}>Editar</button>
            <button onClick={() => eliminar(estado.estado_proveedor_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoProveedor;