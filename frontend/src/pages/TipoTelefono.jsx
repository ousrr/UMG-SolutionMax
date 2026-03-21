import React, { useEffect, useState } from "react";

function TipoTelefono() {
  const [tiposTelefono, setTiposTelefono] = useState([]);
  const [form, setForm] = useState({
    tipo_telefono_id: "",
    nombre_tipo: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/tipo-telefono";

  const obtenerTiposTelefono = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTiposTelefono(data);
    } catch (error) {
      console.error("Error al obtener tipos de teléfono:", error);
    }
  };

  useEffect(() => {
    obtenerTiposTelefono();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "tipo_telefono_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_telefono_id: "",
      nombre_tipo: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarTipoTelefono = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.tipo_telefono_id}`, {
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
      obtenerTiposTelefono();
    } catch (error) {
      console.error("Error al guardar tipo de teléfono:", error);
    }
  };

  const editarTipoTelefono = (tipo) => {
    setForm({
      tipo_telefono_id: tipo.tipo_telefono_id,
      nombre_tipo: tipo.nombre_tipo,
      descripcion: tipo.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarTipoTelefono = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de teléfono?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerTiposTelefono();
    } catch (error) {
      console.error("Error al eliminar tipo de teléfono:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipo de Teléfono</h2>

      <form onSubmit={guardarTipoTelefono} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="tipo_telefono_id"
            value={form.tipo_telefono_id}
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
          {tiposTelefono.length > 0 ? (
            tiposTelefono.map((tipo) => (
              <tr key={tipo.tipo_telefono_id}>
                <td>{tipo.tipo_telefono_id}</td>
                <td>{tipo.nombre_tipo}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button onClick={() => editarTipoTelefono(tipo)}>Editar</button>
                  <button
                    onClick={() => eliminarTipoTelefono(tipo.tipo_telefono_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de teléfono registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TipoTelefono;