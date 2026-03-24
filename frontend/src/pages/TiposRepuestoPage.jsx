import React, { useEffect, useState } from "react";

export default function TiposRepuestoPage() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    tipo_repuesto_id: "",
    nombre_tipo: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/tipos-repuesto";

  const cargarTipos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTipos(data);
    } catch (error) {
      console.error("Error al cargar tipos de repuesto:", error);
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_repuesto_id: "",
      nombre_tipo: "",
      descripcion: "",
      activo: "",
      created_at: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await fetch(`${API}/${form.tipo_repuesto_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_tipo: form.nombre_tipo,
            descripcion: form.descripcion,
            activo: form.activo,
            created_at: form.created_at,
          }),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      limpiarFormulario();
      cargarTipos();
    } catch (error) {
      console.error("Error al guardar tipo de repuesto:", error);
    }
  };

  const handleEditar = (tipo) => {
    setForm({
      tipo_repuesto_id: tipo.tipo_repuesto_id,
      nombre_tipo: tipo.nombre_tipo,
      descripcion: tipo.descripcion,
      activo: tipo.activo,
      created_at: tipo.created_at ? String(tipo.created_at).slice(0, 16) : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de repuesto?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarTipos();
    } catch (error) {
      console.error("Error al eliminar tipo de repuesto:", error);
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="number"
          name="tipo_repuesto_id"
          placeholder="ID"
          value={form.tipo_repuesto_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_tipo"
          placeholder="Nombre del tipo"
          value={form.nombre_tipo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="activo"
          placeholder="Activo"
          value={form.activo}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
        />

        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
          <button
            type="button"
            onClick={limpiarFormulario}
            style={{ marginLeft: "10px" }}
          >
            Limpiar
          </button>
        </div>
      </form>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Tipo</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Created At</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.tipo_repuesto_id}>
              <td>{tipo.tipo_repuesto_id}</td>
              <td>{tipo.nombre_tipo}</td>
              <td>{tipo.descripcion}</td>
              <td>{tipo.activo}</td>
              <td>{tipo.created_at}</td>
              <td>
                <button onClick={() => handleEditar(tipo)}>Editar</button>
                <button
                  onClick={() => handleEliminar(tipo.tipo_repuesto_id)}
                  style={{ marginLeft: "8px" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}