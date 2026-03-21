import React, { useEffect, useState } from "react";

function TipoCliente() {
  const [tiposCliente, setTiposCliente] = useState([]);
  const [form, setForm] = useState({
    tipo_cliente_id: "",
    nombre_tipo: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/tipo-cliente";

  const obtenerTiposCliente = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTiposCliente(data);
    } catch (error) {
      console.error("Error al obtener tipos de cliente:", error);
    }
  };

  useEffect(() => {
    obtenerTiposCliente();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "tipo_cliente_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_cliente_id: "",
      nombre_tipo: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarTipoCliente = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.tipo_cliente_id}`, {
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
      obtenerTiposCliente();
    } catch (error) {
      console.error("Error al guardar tipo de cliente:", error);
    }
  };

  const editarTipoCliente = (tipo) => {
    setForm({
      tipo_cliente_id: tipo.tipo_cliente_id,
      nombre_tipo: tipo.nombre_tipo,
      descripcion: tipo.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarTipoCliente = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de cliente?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerTiposCliente();
    } catch (error) {
      console.error("Error al eliminar tipo de cliente:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipo de Cliente</h2>

      <form onSubmit={guardarTipoCliente} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="tipo_cliente_id"
            value={form.tipo_cliente_id}
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
        <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
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
          {tiposCliente.length > 0 ? (
            tiposCliente.map((tipo) => (
              <tr key={tipo.tipo_cliente_id}>
                <td>{tipo.tipo_cliente_id}</td>
                <td>{tipo.nombre_tipo}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button onClick={() => editarTipoCliente(tipo)}>Editar</button>
                  <button
                    onClick={() => eliminarTipoCliente(tipo.tipo_cliente_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de cliente registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TipoCliente;