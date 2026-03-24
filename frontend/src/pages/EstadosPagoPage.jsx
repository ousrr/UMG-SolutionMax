import React, { useEffect, useState } from "react";

export default function EstadosPagoPage() {
  const [estadosPago, setEstadosPago] = useState([]);
  const [form, setForm] = useState({
    estado_pago_id: "",
    nombre: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/estados-pago";

  const cargarEstadosPago = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEstadosPago(data);
    } catch (error) {
      console.error("Error al cargar estados de pago:", error);
    }
  };

  useEffect(() => {
    cargarEstadosPago();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      estado_pago_id: "",
      nombre: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await fetch(`${API}/${form.estado_pago_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
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
      cargarEstadosPago();
    } catch (error) {
      console.error("Error al guardar estado de pago:", error);
    }
  };

  const handleEditar = (estadoPago) => {
    setForm({
      estado_pago_id: estadoPago.estado_pago_id,
      nombre: estadoPago.nombre,
      descripcion: estadoPago.descripcion,
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este estado de pago?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarEstadosPago();
    } catch (error) {
      console.error("Error al eliminar estado de pago:", error);
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
          name="estado_pago_id"
          placeholder="ID"
          value={form.estado_pago_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estadosPago.map((estadoPago) => (
            <tr key={estadoPago.estado_pago_id}>
              <td>{estadoPago.estado_pago_id}</td>
              <td>{estadoPago.nombre}</td>
              <td>{estadoPago.descripcion}</td>
              <td>
                <button onClick={() => handleEditar(estadoPago)}>Editar</button>
                <button
                  onClick={() => handleEliminar(estadoPago.estado_pago_id)}
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