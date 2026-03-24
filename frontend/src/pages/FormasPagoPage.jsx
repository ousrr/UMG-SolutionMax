import React, { useEffect, useState } from "react";

export default function FormasPagoPage() {
  const [formasPago, setFormasPago] = useState([]);
  const [form, setForm] = useState({
    forma_pago_id: "",
    nombre: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/formas-pago";

  const cargarFormasPago = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setFormasPago(data);
    } catch (error) {
      console.error("Error al cargar formas de pago:", error);
    }
  };

  useEffect(() => {
    cargarFormasPago();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      forma_pago_id: "",
      nombre: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await fetch(`${API}/${form.forma_pago_id}`, {
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
      cargarFormasPago();
    } catch (error) {
      console.error("Error al guardar forma de pago:", error);
    }
  };

  const handleEditar = (formaPago) => {
    setForm({
      forma_pago_id: formaPago.forma_pago_id,
      nombre: formaPago.nombre,
      descripcion: formaPago.descripcion,
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta forma de pago?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarFormasPago();
    } catch (error) {
      console.error("Error al eliminar forma de pago:", error);
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
          name="forma_pago_id"
          placeholder="ID"
          value={form.forma_pago_id}
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
          {formasPago.map((formaPago) => (
            <tr key={formaPago.forma_pago_id}>
              <td>{formaPago.forma_pago_id}</td>
              <td>{formaPago.nombre}</td>
              <td>{formaPago.descripcion}</td>
              <td>
                <button onClick={() => handleEditar(formaPago)}>Editar</button>
                <button
                  onClick={() => handleEliminar(formaPago.forma_pago_id)}
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