import React, { useEffect, useState } from "react";

function MarcaVehiculo() {
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState({
    marca_id: "",
    nombre_marca: "",
    pais_origen: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/marca-vehiculo";

  const obtenerMarcas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMarcas(data);
    } catch (error) {
      console.error("Error al obtener marcas de vehículo:", error);
    }
  };

  useEffect(() => {
    obtenerMarcas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "marca_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      marca_id: "",
      nombre_marca: "",
      pais_origen: "",
    });
    setEditando(false);
  };

  const guardarMarca = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.marca_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_marca: form.nombre_marca,
            pais_origen: form.pais_origen,
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
      obtenerMarcas();
    } catch (error) {
      console.error("Error al guardar marca de vehículo:", error);
    }
  };

  const editarMarca = (marca) => {
    setForm({
      marca_id: marca.marca_id,
      nombre_marca: marca.nombre_marca,
      pais_origen: marca.pais_origen,
    });
    setEditando(true);
  };

  const eliminarMarca = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta marca de vehículo?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerMarcas();
    } catch (error) {
      console.error("Error al eliminar marca de vehículo:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Marcas de Vehículo</h2>

      <form onSubmit={guardarMarca} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="marca_id"
            value={form.marca_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre de la marca</label>
          <br />
          <input
            type="text"
            name="nombre_marca"
            value={form.nombre_marca}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>País de origen</label>
          <br />
          <input
            type="text"
            name="pais_origen"
            value={form.pais_origen}
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
            <th>Nombre de la marca</th>
            <th>País de origen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.length > 0 ? (
            marcas.map((marca) => (
              <tr key={marca.marca_id}>
                <td>{marca.marca_id}</td>
                <td>{marca.nombre_marca}</td>
                <td>{marca.pais_origen}</td>
                <td>
                  <button onClick={() => editarMarca(marca)}>Editar</button>
                  <button
                    onClick={() => eliminarMarca(marca.marca_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay marcas registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MarcaVehiculo;