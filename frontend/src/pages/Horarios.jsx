import React, { useEffect, useState } from "react";

function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState({
    id_horario: "",
    hora_inicio: "",
    hora_fin: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/horarios";

  const obtenerHorarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error al obtener horarios:", error);
    }
  };

  useEffect(() => {
    obtenerHorarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "id_horario" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      id_horario: "",
      hora_inicio: "",
      hora_fin: "",
    });
    setEditando(false);
  };

  const guardarHorario = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.id_horario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hora_inicio: form.hora_inicio,
            hora_fin: form.hora_fin,
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
      obtenerHorarios();
    } catch (error) {
      console.error("Error al guardar horario:", error);
    }
  };

  const editarHorario = (horario) => {
    setForm({
      id_horario: horario.id_horario,
      hora_inicio: horario.hora_inicio,
      hora_fin: horario.hora_fin,
    });
    setEditando(true);
  };

  const eliminarHorario = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este horario?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerHorarios();
    } catch (error) {
      console.error("Error al eliminar horario:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Horarios</h2>

      <form onSubmit={guardarHorario} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="id_horario"
            value={form.id_horario}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Hora inicio</label>
          <br />
          <input
            type="text"
            name="hora_inicio"
            value={form.hora_inicio}
            onChange={handleChange}
            placeholder="08:00"
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Hora fin</label>
          <br />
          <input
            type="text"
            name="hora_fin"
            value={form.hora_fin}
            onChange={handleChange}
            placeholder="09:00"
            required
          />
        </div>

        <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
          Limpiar
        </button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.length > 0 ? (
            horarios.map((horario) => (
              <tr key={horario.id_horario}>
                <td>{horario.id_horario}</td>
                <td>{horario.hora_inicio}</td>
                <td>{horario.hora_fin}</td>
                <td>
                  <button onClick={() => editarHorario(horario)}>Editar</button>
                  <button
                    onClick={() => eliminarHorario(horario.id_horario)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay horarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Horarios;