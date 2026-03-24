import React, { useEffect, useState } from "react";

export default function MarcasRepuestoPage() {
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState({
    marca_repuesto_id: "",
    nombre_marca: "",
    pais_origen: "",
    descripcion: "",
    activo: "",
    created_at: "",
  });
  const [editando, setEditando] = useState(false);

  const API = "http://localhost:3001/api/marcas-repuesto";

  const cargarMarcas = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setMarcas(data);
    } catch (error) {
      console.error("Error al cargar marcas de repuesto:", error);
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      marca_repuesto_id: "",
      nombre_marca: "",
      pais_origen: "",
      descripcion: "",
      activo: "",
      created_at: "",
    });
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await fetch(`${API}/${form.marca_repuesto_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_marca: form.nombre_marca,
            pais_origen: form.pais_origen,
            descripcion: form.descripcion,
            activo: form.activo,
            created_at: form.created_at,
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
      cargarMarcas();
    } catch (error) {
      console.error("Error al guardar marca de repuesto:", error);
    }
  };

  const handleEditar = (marca) => {
    setForm({
      marca_repuesto_id: marca.marca_repuesto_id,
      nombre_marca: marca.nombre_marca,
      pais_origen: marca.pais_origen,
      descripcion: marca.descripcion,
      activo: marca.activo,
      created_at: marca.created_at ? String(marca.created_at).slice(0, 16) : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta marca de repuesto?");
    if (!confirmar) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      cargarMarcas();
    } catch (error) {
      console.error("Error al eliminar marca de repuesto:", error);
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
          name="marca_repuesto_id"
          placeholder="ID"
          value={form.marca_repuesto_id}
          onChange={handleChange}
          disabled={editando}
          required
        />
        <input
          type="text"
          name="nombre_marca"
          placeholder="Nombre de marca"
          value={form.nombre_marca}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pais_origen"
          placeholder="País de origen"
          value={form.pais_origen}
          onChange={handleChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="activo"
          placeholder="Activo"
          value={form.activo}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="created_at"
          value={form.created_at}
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
            <th>Nombre Marca</th>
            <th>País Origen</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Created At</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.marca_repuesto_id}>
              <td>{marca.marca_repuesto_id}</td>
              <td>{marca.nombre_marca}</td>
              <td>{marca.pais_origen}</td>
              <td>{marca.descripcion}</td>
              <td>{marca.activo}</td>
              <td>{marca.created_at}</td>
              <td>
                <button onClick={() => handleEditar(marca)}>Editar</button>
                <button
                  onClick={() => handleEliminar(marca.marca_repuesto_id)}
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