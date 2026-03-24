import React, { useEffect, useState } from "react";

export default function MotivosAjusteInventarioPage() {
  const [motivos, setMotivos] = useState([]);
  const [form, setForm] = useState({
    motivo_ajuste_id: "",
    nombre_motivo: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/motivos-ajuste-inventario";

  const cargarMotivos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setMotivos(data);
    } catch (error) {
      console.error("Error al cargar motivos de ajuste:", error);
    }
  };

  useEffect(() => {
    cargarMotivos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      motivo_ajuste_id: "",
      nombre_motivo: "",
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
        await fetch(`${API}/${form.motivo_ajuste_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_motivo: form.nombre_motivo,
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
      cargarMotivos();
    } catch (error) {
      console.error("Error al guardar motivo de ajuste:", error);
    }
  };

  const handleEditar = (motivo) => {
    setForm({
      motivo_ajuste_id: motivo.motivo_ajuste_id,
      nombre_motivo: motivo.nombre_motivo,
      descripcion: motivo.descripcion,
      activo: motivo.activo,
      created_at: motivo.created_at ? String(motivo.created_at).slice(0, 16) : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este motivo de ajuste?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarMotivos();
    } catch (error) {
      console.error("Error al eliminar motivo de ajuste:", error);
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
          name="motivo_ajuste_id"
          placeholder="ID"
          value={form.motivo_ajuste_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_motivo"
          placeholder="Nombre del motivo"
          value={form.nombre_motivo}
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
            <th>Nombre Motivo</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Created At</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {motivos.map((motivo) => (
            <tr key={motivo.motivo_ajuste_id}>
              <td>{motivo.motivo_ajuste_id}</td>
              <td>{motivo.nombre_motivo}</td>
              <td>{motivo.descripcion}</td>
              <td>{motivo.activo}</td>
              <td>{motivo.created_at}</td>
              <td>
                <button onClick={() => handleEditar(motivo)}>Editar</button>
                <button
                  onClick={() => handleEliminar(motivo.motivo_ajuste_id)}
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