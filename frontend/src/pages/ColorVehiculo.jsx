import React, { useEffect, useState } from "react";

function ColorVehiculo() {
  const [colores, setColores] = useState([]);
  const [form, setForm] = useState({
    color_id: "",
    nombre_color: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/color-vehiculo";

  const obtenerColores = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setColores(data);
    } catch (error) {
      console.error("Error al obtener colores de vehículo:", error);
    }
  };

  useEffect(() => {
    obtenerColores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "color_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      color_id: "",
      nombre_color: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarColor = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.color_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_color: form.nombre_color,
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
      obtenerColores();
    } catch (error) {
      console.error("Error al guardar color de vehículo:", error);
    }
  };

  const editarColor = (color) => {
    setForm({
      color_id: color.color_id,
      nombre_color: color.nombre_color,
      descripcion: color.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarColor = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este color de vehículo?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerColores();
    } catch (error) {
      console.error("Error al eliminar color de vehículo:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Colores de Vehículo</h2>

      <form onSubmit={guardarColor} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="color_id"
            value={form.color_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del color</label>
          <br />
          <input
            type="text"
            name="nombre_color"
            value={form.nombre_color}
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
            <th>Nombre del color</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {colores.length > 0 ? (
            colores.map((color) => (
              <tr key={color.color_id}>
                <td>{color.color_id}</td>
                <td>{color.nombre_color}</td>
                <td>{color.descripcion}</td>
                <td>
                  <button onClick={() => editarColor(color)}>Editar</button>
                  <button
                    onClick={() => eliminarColor(color.color_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay colores registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ColorVehiculo;