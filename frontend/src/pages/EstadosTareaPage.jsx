import React, { useEffect, useState } from "react";

export default function EstadosTareaPage() {
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState({
    estado_tarea_id: "",
    nombre_estado: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/estados-tarea";

  const cargarEstados = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEstados(data);
    } catch (error) {
      console.error("Error al cargar estados de tarea:", error);
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
      estado_tarea_id: "",
      nombre_estado: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await fetch(`${API}/${form.estado_tarea_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_estado: form.nombre_estado,
            descripcion: form.descripcion,
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
      console.error("Error al guardar estado de tarea:", error);
    }
  };

  const handleEditar = (estado) => {
    setForm({
      estado_tarea_id: estado.estado_tarea_id,
      nombre_estado: estado.nombre_estado,
      descripcion: estado.descripcion,
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este estado de tarea?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarEstados();
    } catch (error) {
      console.error("Error al eliminar estado de tarea:", error);
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
          name="estado_tarea_id"
          placeholder="ID"
          value={form.estado_tarea_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_estado"
          placeholder="Nombre del estado"
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
            <th>Nombre Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.estado_tarea_id}>
              <td>{estado.estado_tarea_id}</td>
              <td>{estado.nombre_estado}</td>
              <td>{estado.descripcion}</td>
              <td>
                <button onClick={() => handleEditar(estado)}>Editar</button>
                <button
                  onClick={() => handleEliminar(estado.estado_tarea_id)}
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