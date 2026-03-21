import React, { useEffect, useState } from "react";

function CombustibleVehiculo() {
  const [combustibles, setCombustibles] = useState([]);
  const [form, setForm] = useState({
    combustible_id: "",
    nombre_combustible: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/combustible-vehiculo";

  const obtenerCombustibles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCombustibles(data);
    } catch (error) {
      console.error("Error al obtener combustibles de vehículo:", error);
    }
  };

  useEffect(() => {
    obtenerCombustibles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "combustible_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      combustible_id: "",
      nombre_combustible: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarCombustible = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.combustible_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_combustible: form.nombre_combustible,
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
      obtenerCombustibles();
    } catch (error) {
      console.error("Error al guardar tipo de combustible:", error);
    }
  };

  const editarCombustible = (combustible) => {
    setForm({
      combustible_id: combustible.combustible_id,
      nombre_combustible: combustible.nombre_combustible,
      descripcion: combustible.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarCombustible = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de combustible?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerCombustibles();
    } catch (error) {
      console.error("Error al eliminar tipo de combustible:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipos de Combustible</h2>

      <form onSubmit={guardarCombustible} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="combustible_id"
            value={form.combustible_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del combustible</label>
          <br />
          <input
            type="text"
            name="nombre_combustible"
            value={form.nombre_combustible}
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
            <th>Nombre del combustible</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {combustibles.length > 0 ? (
            combustibles.map((combustible) => (
              <tr key={combustible.combustible_id}>
                <td>{combustible.combustible_id}</td>
                <td>{combustible.nombre_combustible}</td>
                <td>{combustible.descripcion}</td>
                <td>
                  <button onClick={() => editarCombustible(combustible)}>Editar</button>
                  <button
                    onClick={() => eliminarCombustible(combustible.combustible_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de combustible registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CombustibleVehiculo;