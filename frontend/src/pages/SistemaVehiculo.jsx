import React, { useEffect, useState } from "react";

function SistemaVehiculo() {
  const [sistemas, setSistemas] = useState([]);
  const [form, setForm] = useState({
    sistema_vehiculo_id: "",
    nombre_sistema: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/sistema-vehiculo";

  const obtenerSistemas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSistemas(data);
    } catch (error) {
      console.error("Error al obtener sistemas del vehículo:", error);
    }
  };

  useEffect(() => {
    obtenerSistemas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "sistema_vehiculo_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      sistema_vehiculo_id: "",
      nombre_sistema: "",
    });
    setEditando(false);
  };

  const guardarSistema = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.sistema_vehiculo_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_sistema: form.nombre_sistema,
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
      obtenerSistemas();
    } catch (error) {
      console.error("Error al guardar sistema del vehículo:", error);
    }
  };

  const editarSistema = (sistema) => {
    setForm({
      sistema_vehiculo_id: sistema.sistema_vehiculo_id,
      nombre_sistema: sistema.nombre_sistema,
    });
    setEditando(true);
  };

  const eliminarSistema = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este sistema del vehículo?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerSistemas();
    } catch (error) {
      console.error("Error al eliminar sistema del vehículo:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Sistemas del Vehículo</h2>

      <form onSubmit={guardarSistema} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="sistema_vehiculo_id"
            value={form.sistema_vehiculo_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del sistema</label>
          <br />
          <input
            type="text"
            name="nombre_sistema"
            value={form.nombre_sistema}
            onChange={handleChange}
            required
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
            <th>Nombre del sistema</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sistemas.length > 0 ? (
            sistemas.map((sistema) => (
              <tr key={sistema.sistema_vehiculo_id}>
                <td>{sistema.sistema_vehiculo_id}</td>
                <td>{sistema.nombre_sistema}</td>
                <td>
                  <button onClick={() => editarSistema(sistema)}>Editar</button>
                  <button
                    onClick={() => eliminarSistema(sistema.sistema_vehiculo_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay sistemas registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SistemaVehiculo;