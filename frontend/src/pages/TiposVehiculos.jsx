import React, { useEffect, useState } from "react";

function TiposVehiculos() {
  const [tiposVehiculos, setTiposVehiculos] = useState([]);
  const [form, setForm] = useState({
    tipo_vehiculo_id: "",
    nombre_tipo: "",
    descripcion: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/tipos-vehiculos";

  const obtenerTiposVehiculos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTiposVehiculos(data);
    } catch (error) {
      console.error("Error al obtener tipos de vehículos:", error);
    }
  };

  useEffect(() => {
    obtenerTiposVehiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "tipo_vehiculo_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      tipo_vehiculo_id: "",
      nombre_tipo: "",
      descripcion: "",
    });
    setEditando(false);
  };

  const guardarTipoVehiculo = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.tipo_vehiculo_id}`, {
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
      obtenerTiposVehiculos();
    } catch (error) {
      console.error("Error al guardar tipo de vehículo:", error);
    }
  };

  const editarTipoVehiculo = (tipo) => {
    setForm({
      tipo_vehiculo_id: tipo.tipo_vehiculo_id,
      nombre_tipo: tipo.nombre_tipo,
      descripcion: tipo.descripcion || "",
    });
    setEditando(true);
  };

  const eliminarTipoVehiculo = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este tipo de vehículo?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerTiposVehiculos();
    } catch (error) {
      console.error("Error al eliminar tipo de vehículo:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Tipos de Vehículos</h2>

      <form onSubmit={guardarTipoVehiculo} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="tipo_vehiculo_id"
            value={form.tipo_vehiculo_id}
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
          {tiposVehiculos.length > 0 ? (
            tiposVehiculos.map((tipo) => (
              <tr key={tipo.tipo_vehiculo_id}>
                <td>{tipo.tipo_vehiculo_id}</td>
                <td>{tipo.nombre_tipo}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button onClick={() => editarTipoVehiculo(tipo)}>Editar</button>
                  <button
                    onClick={() => eliminarTipoVehiculo(tipo.tipo_vehiculo_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos de vehículos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TiposVehiculos;