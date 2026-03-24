import React, { useEffect, useState } from "react";

export default function EstadosOrdenCompraPage() {
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState({
    estado_orden_compra_id: "",
    nombre_estado: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/estados-orden-compra";

  const cargarEstados = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEstados(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarEstados();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      estado_orden_compra_id: "",
      nombre_estado: "",
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
        await fetch(`${API}/${form.estado_orden_compra_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_estado: form.nombre_estado,
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
      cargarEstados();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditar = (estado) => {
    setForm({
      ...estado,
      created_at: estado.created_at
        ? String(estado.created_at).slice(0, 16)
        : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar registro?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarEstados();
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        <input
          type="number"
          name="estado_orden_compra_id"
          placeholder="ID"
          value={form.estado_orden_compra_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_estado"
          placeholder="Nombre"
          value={form.nombre_estado}
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
        />
        <input
          type="datetime-local"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
        />

        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit">
            {editando ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" onClick={limpiarFormulario}>
            Limpiar
          </button>
        </div>
      </form>

      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((e) => (
            <tr key={e.estado_orden_compra_id}>
              <td>{e.estado_orden_compra_id}</td>
              <td>{e.nombre_estado}</td>
              <td>{e.descripcion}</td>
              <td>{e.activo}</td>
              <td>{e.created_at}</td>
              <td>
                <button onClick={() => handleEditar(e)}>Editar</button>
                <button onClick={() => handleEliminar(e.estado_orden_compra_id)}>
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