import React, { useEffect, useState } from "react";

function EstadoCliente() {
  const [estadosCliente, setEstadosCliente] = useState([]);
  const [form, setForm] = useState({
    estado_cliente_id: "",
    nombre_estado: "",
    descripcion: "",
    activo: "S",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/estado-cliente";

  const obtenerEstadosCliente = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEstadosCliente(data);
    } catch (error) {
      console.error("Error al obtener estados de cliente:", error);
    }
  };

  useEffect(() => {
    obtenerEstadosCliente();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado_cliente_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      estado_cliente_id: "",
      nombre_estado: "",
      descripcion: "",
      activo: "S",
    });
    setEditando(false);
  };

  const guardarEstadoCliente = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.estado_cliente_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_estado: form.nombre_estado,
            descripcion: form.descripcion,
            activo: form.activo,
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
      obtenerEstadosCliente();
    } catch (error) {
      console.error("Error al guardar estado de cliente:", error);
    }
  };

  const editarEstadoCliente = (estado) => {
    setForm({
      estado_cliente_id: estado.estado_cliente_id,
      nombre_estado: estado.nombre_estado,
      descripcion: estado.descripcion || "",
      activo: estado.activo,
    });
    setEditando(true);
  };

  const eliminarEstadoCliente = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este estado de cliente?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerEstadosCliente();
    } catch (error) {
      console.error("Error al eliminar estado de cliente:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Estado de Cliente</h2>

      <form onSubmit={guardarEstadoCliente} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="estado_cliente_id"
            value={form.estado_cliente_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre estado</label>
          <br />
          <input
            type="text"
            name="nombre_estado"
            value={form.nombre_estado}
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

        <div style={{ marginBottom: "10px" }}>
          <label>Activo</label>
          <br />
          <select name="activo" value={form.activo} onChange={handleChange}>
            <option value="S">Sí</option>
            <option value="N">No</option>
          </select>
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
            <th>Nombre estado</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estadosCliente.length > 0 ? (
            estadosCliente.map((estado) => (
              <tr key={estado.estado_cliente_id}>
                <td>{estado.estado_cliente_id}</td>
                <td>{estado.nombre_estado}</td>
                <td>{estado.descripcion}</td>
                <td>{estado.activo}</td>
                <td>
                  <button onClick={() => editarEstadoCliente(estado)}>Editar</button>
                  <button
                    onClick={() => eliminarEstadoCliente(estado.estado_cliente_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay estados de cliente registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoCliente;