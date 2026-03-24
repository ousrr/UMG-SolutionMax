import React, { useEffect, useState } from "react";

export default function UnidadesMedidaPage() {
  const [unidades, setUnidades] = useState([]);
  const [form, setForm] = useState({
    unidad_medida_id: "",
    nombre_unidad: "",
    abreviatura: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/unidades-medida";

  const cargarUnidades = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setUnidades(data);
    } catch (error) {
      console.error("Error al cargar unidades de medida:", error);
    }
  };

  useEffect(() => {
    cargarUnidades();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      unidad_medida_id: "",
      nombre_unidad: "",
      abreviatura: "",
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
        await fetch(`${API}/${form.unidad_medida_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_unidad: form.nombre_unidad,
            abreviatura: form.abreviatura,
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
      cargarUnidades();
    } catch (error) {
      console.error("Error al guardar unidad de medida:", error);
    }
  };

  const handleEditar = (unidad) => {
    setForm({
      unidad_medida_id: unidad.unidad_medida_id,
      nombre_unidad: unidad.nombre_unidad,
      abreviatura: unidad.abreviatura,
      descripcion: unidad.descripcion,
      activo: unidad.activo,
      created_at: unidad.created_at
        ? String(unidad.created_at).slice(0, 16)
        : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta unidad de medida?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarUnidades();
    } catch (error) {
      console.error("Error al eliminar unidad de medida:", error);
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="unidad_medida_id"
          placeholder="ID"
          value={form.unidad_medida_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_unidad"
          placeholder="Nombre"
          value={form.nombre_unidad}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="abreviatura"
          placeholder="Abreviatura"
          value={form.abreviatura}
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
            <th>Abreviatura</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Created At</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidad) => (
            <tr key={unidad.unidad_medida_id}>
              <td>{unidad.unidad_medida_id}</td>
              <td>{unidad.nombre_unidad}</td>
              <td>{unidad.abreviatura}</td>
              <td>{unidad.descripcion}</td>
              <td>{unidad.activo}</td>
              <td>{unidad.created_at}</td>
              <td>
                <button onClick={() => handleEditar(unidad)}>Editar</button>
                <button
                  onClick={() => handleEliminar(unidad.unidad_medida_id)}
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