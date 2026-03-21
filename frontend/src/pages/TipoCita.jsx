import React, { useEffect, useState } from "react";

function TipoCita() {
  const [tiposCita, setTiposCita] = useState([]);
  const [form, setForm] = useState({
    tipo_cita_id: "",
    nombre: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/tipo-cita";

  const obtenerTiposCita = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTiposCita(data);
    } catch (error) {
      console.error("Error al obtener tipos de cita:", error);
    }
  };

  useEffect(() => {
    obtenerTiposCita();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "tipo_cita_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_cita_id: "",
      nombre: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarTipoCita = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.tipo_cita_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
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
      obtenerTiposCita();
    } catch (error) {
      console.error("Error al guardar tipo de cita:", error);
    }
  };

  const editarTipoCita = (tipo) => {
    setForm({
      tipo_cita_id: tipo.tipo_cita_id,
      nombre: tipo.nombre,
      descripcion: tipo.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarTipoCita = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de cita?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerTiposCita();
    } catch (error) {
      console.error("Error al eliminar tipo de cita:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipo de Cita</h2>

      <form onSubmit={guardarTipoCita} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="tipo_cita_id"
            value={form.tipo_cita_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposCita.length > 0 ? (
            tiposCita.map((tipo) => (
              <tr key={tipo.tipo_cita_id}>
                <td>{tipo.tipo_cita_id}</td>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button onClick={() => editarTipoCita(tipo)}>Editar</button>
                  <button
                    onClick={() => eliminarTipoCita(tipo.tipo_cita_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de cita registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TipoCita;