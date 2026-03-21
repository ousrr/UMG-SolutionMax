import React, { useEffect, useState } from "react";

function EstadoFisico() {
  const [estadosFisicos, setEstadosFisicos] = useState([]);
  const [form, setForm] = useState({
    estado_fisico_id: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/estado-fisico";

  const obtenerEstadosFisicos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEstadosFisicos(data);
    } catch (error) {
      console.error("Error al obtener estados físicos:", error);
    }
  };

  useEffect(() => {
    obtenerEstadosFisicos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado_fisico_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      estado_fisico_id: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarEstadoFisico = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.estado_fisico_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descripcion: form.descripcion,
          }),
        });

        const data = await res.json();
        alert(data.message);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        alert(data.message);
      }

      limpiarFormulario();
      obtenerEstadosFisicos();
    } catch (error) {
      console.error("Error al guardar estado físico:", error);
    }
  };

  const editarEstadoFisico = (estado) => {
    setForm({
      estado_fisico_id: estado.estado_fisico_id,
      descripcion: estado.descripcion,
    });
    setEditando(true);
  };

  const eliminarEstadoFisico = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este estado físico?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerEstadosFisicos();
    } catch (error) {
      console.error("Error al eliminar estado físico:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Estados Físicos</h2>

      <form onSubmit={guardarEstadoFisico} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="estado_fisico_id"
            value={form.estado_fisico_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Descripción</label>
          <br />
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
        <button
          type="button"
          onClick={limpiarFormulario}
          style={{ marginLeft: "10px" }}
        >
          Limpiar
        </button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estadosFisicos.length > 0 ? (
            estadosFisicos.map((estado) => (
              <tr key={estado.estado_fisico_id}>
                <td>{estado.estado_fisico_id}</td>
                <td>{estado.descripcion}</td>
                <td>
                  <button onClick={() => editarEstadoFisico(estado)}>Editar</button>
                  <button
                    onClick={() => eliminarEstadoFisico(estado.estado_fisico_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay estados físicos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoFisico;