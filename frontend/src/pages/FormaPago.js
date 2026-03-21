import { useEffect, useState } from "react";

function FormaPago() {
  const [formasPago, setFormasPago] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtener = async () => {
    const res = await fetch("http://localhost:3001/api/formas-pago");
    const data = await res.json();
    setFormasPago(data);
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
      await fetch(`http://localhost:3001/api/formas-pago/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/formas-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forma_pago_id: id,
          nombre,
          descripcion,
        }),
      });
    }

    limpiar();
    obtener();
  };

  const editar = (fp) => {
    setId(fp.forma_pago_id);
    setNombre(fp.nombre);
    setDescripcion(fp.descripcion || "");
    setEditandoId(fp.forma_pago_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/formas-pago/${id}`, {
      method: "DELETE",
    });
    obtener();
  };

  return (
    <div>
      <h2>Formas de Pago</h2>

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
        {formasPago.map((fp) => (
          <li key={fp.forma_pago_id}>
            {fp.nombre}
            <button onClick={() => editar(fp)}>Editar</button>
            <button onClick={() => eliminar(fp.forma_pago_id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormaPago;