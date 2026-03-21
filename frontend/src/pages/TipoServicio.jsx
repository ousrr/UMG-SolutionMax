import React, { useEffect, useState } from "react";

function TipoServicio() {
  const [tiposServicio, setTiposServicio] = useState([]);
  const [form, setForm] = useState({
    tipo_servicio_id: "",
    nombre_tipo: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/tipo-servicio";

  const obtenerTiposServicio = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTiposServicio(data);
    } catch (error) {
      console.error("Error al obtener tipos de servicio:", error);
    }
  };

  useEffect(() => {
    obtenerTiposServicio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "tipo_servicio_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_servicio_id: "",
      nombre_tipo: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarTipoServicio = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.tipo_servicio_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_tipo: form.nombre_tipo,
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
      obtenerTiposServicio();
    } catch (error) {
      console.error("Error al guardar tipo de servicio:", error);
    }
  };

  const editarTipoServicio = (tipo) => {
    setForm({
      tipo_servicio_id: tipo.tipo_servicio_id,
      nombre_tipo: tipo.nombre_tipo,
      descripcion: tipo.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarTipoServicio = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de servicio?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerTiposServicio();
    } catch (error) {
      console.error("Error al eliminar tipo de servicio:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipos de Servicio</h2>

      <form onSubmit={guardarTipoServicio} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="tipo_servicio_id"
            value={form.tipo_servicio_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre tipo</label>
          <br />
          <input
            type="text"
            name="nombre_tipo"
            value={form.nombre_tipo}
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
            <th>Nombre tipo</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposServicio.length > 0 ? (
            tiposServicio.map((tipo) => (
              <tr key={tipo.tipo_servicio_id}>
                <td>{tipo.tipo_servicio_id}</td>
                <td>{tipo.nombre_tipo}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button onClick={() => editarTipoServicio(tipo)}>Editar</button>
                  <button
                    onClick={() => eliminarTipoServicio(tipo.tipo_servicio_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de servicio registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TipoServicio;