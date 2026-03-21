import React, { useEffect, useState } from "react";

function Pais() {
  const [paises, setPaises] = useState([]);
  const [form, setForm] = useState({
    pais_id: "",
    nombre_pais: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/pais";

  const obtenerPaises = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPaises(data);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  useEffect(() => {
    obtenerPaises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "pais_id" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      pais_id: "",
      nombre_pais: "",
    });
    setEditando(false);
  };

  const guardarPais = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.pais_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_pais: form.nombre_pais,
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
      obtenerPaises();
    } catch (error) {
      console.error("Error al guardar país:", error);
    }
  };

  const editarPais = (pais) => {
    setForm({
      pais_id: pais.pais_id,
      nombre_pais: pais.nombre_pais,
    });
    setEditando(true);
  };

  const eliminarPais = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este país?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerPaises();
    } catch (error) {
      console.error("Error al eliminar país:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Países</h2>

      <form onSubmit={guardarPais} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="pais_id"
            value={form.pais_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del país</label>
          <br />
          <input
            type="text"
            name="nombre_pais"
            value={form.nombre_pais}
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
            <th>Nombre del país</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.length > 0 ? (
            paises.map((pais) => (
              <tr key={pais.pais_id}>
                <td>{pais.pais_id}</td>
                <td>{pais.nombre_pais}</td>
                <td>
                  <button onClick={() => editarPais(pais)}>Editar</button>
                  <button
                    onClick={() => eliminarPais(pais.pais_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay países registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Pais;