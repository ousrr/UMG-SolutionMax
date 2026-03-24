import React, { useEffect, useState } from "react";

export default function EstadosRepuestoPage() {
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState({
    estado_repuesto_id: "",
    nombre_estado: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/estados-repuesto";

  const cargarEstados = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al cargar estados de repuesto:", error);
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
      estado_repuesto_id: "",
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
        await fetch(`${API}/${form.estado_repuesto_id}`, {
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
      console.error("Error al guardar estado de repuesto:", error);
    }
  };

  const handleEditar = (estado) => {
    setForm({
      estado_repuesto_id: estado.estado_repuesto_id,
      nombre_estado: estado.nombre_estado,
      descripcion: estado.descripcion,
      activo: estado.activo,
      created_at: estado.created_at
        ? String(estado.created_at).slice(0, 16)
        : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este estado de repuesto?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarEstados();
    } catch (error) {
      console.error("Error al eliminar estado de repuesto:", error);
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="estado_repuesto_id"
          placeholder="ID"
          value={form.estado_repuesto_id}
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
          required
        />
        <input
          type="datetime-local"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
        />

        <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
        <button
          type="button"
          onClick={limpiarFormulario}
          style={{ marginLeft: "10px" }}
        >
          Limpiar
        </button>
      </form>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Created At</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.estado_repuesto_id}>
              <td>{estado.estado_repuesto_id}</td>
              <td>{estado.nombre_estado}</td>
              <td>{estado.descripcion}</td>
              <td>{estado.activo}</td>
              <td>{estado.created_at}</td>
              <td>
                <button onClick={() => handleEditar(estado)}>Editar</button>
                <button
                  onClick={() => handleEliminar(estado.estado_repuesto_id)}
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