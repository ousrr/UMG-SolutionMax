import { useEffect, useState } from "react";

function CondicionPagoProveedor() {
  const [condiciones, setCondiciones] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [dias, setDias] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/condiciones-pago-proveedor");
    const data = await res.json();
    setCondiciones(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  const limpiar = () => {
    setId("");
    setNombre("");
    setDias("");
    setDescripcion("");
    setActivo("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/condiciones-pago-proveedor/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_condicion: nombre,
          dias_credito: dias,
          descripcion,
          activo,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/condiciones-pago-proveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condicion_pago_id: id,
          nombre_condicion: nombre,
          dias_credito: dias,
          descripcion,
          activo,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (c) => {
    setId(c.condicion_pago_id);
    setNombre(c.nombre_condicion);
    setDias(c.dias_credito || "");
    setDescripcion(c.descripcion || "");
    setActivo(c.activo || "");
    setEditandoId(c.condicion_pago_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/condiciones-pago-proveedor/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Condiciones de Pago Proveedor</h2>

      {!editandoId && (
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      )}

      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Días crédito" value={dias} onChange={(e) => setDias(e.target.value)} />
      <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <input placeholder="Activo" value={activo} onChange={(e) => setActivo(e.target.value)} />

      <button onClick={guardar}>{editandoId ? "Actualizar" : "Guardar"}</button>

      <ul>
        {condiciones.map((c) => (
          <li key={c.condicion_pago_id}>
            {c.nombre_condicion} - {c.dias_credito}
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => eliminar(c.condicion_pago_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CondicionPagoProveedor;