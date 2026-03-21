import React, { useEffect, useState } from "react";

function Municipio() {
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [form, setForm] = useState({
    municipio_id: "",
    departamento_id: "",
    nombre_municipio: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/municipio";
  const API_DEPARTAMENTOS = "http://localhost:3000/api/departamento";

  const obtenerMunicipios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMunicipios(data);
    } catch (error) {
      console.error("Error al obtener municipios:", error);
    }
  };

  const obtenerDepartamentos = async () => {
    try {
      const res = await fetch(API_DEPARTAMENTOS);
      const data = await res.json();
      setDepartamentos(data);
    } catch (error) {
      console.error("Error al obtener departamentos:", error);
    }
  };

  useEffect(() => {
    obtenerMunicipios();
    obtenerDepartamentos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "municipio_id" || name === "departamento_id"
          ? Number(value)
          : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      municipio_id: "",
      departamento_id: "",
      nombre_municipio: "",
    });
    setEditando(false);
  };

  const guardarMunicipio = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.municipio_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            departamento_id: form.departamento_id,
            nombre_municipio: form.nombre_municipio,
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
      obtenerMunicipios();
    } catch (error) {
      console.error("Error al guardar municipio:", error);
    }
  };

  const editarMunicipio = (municipio) => {
    setForm({
      municipio_id: municipio.municipio_id,
      departamento_id: municipio.departamento_id,
      nombre_municipio: municipio.nombre_municipio,
    });
    setEditando(true);
  };

  const eliminarMunicipio = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este municipio?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerMunicipios();
    } catch (error) {
      console.error("Error al eliminar municipio:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Municipios</h2>

      <form onSubmit={guardarMunicipio} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="municipio_id"
            value={form.municipio_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Departamento</label>
          <br />
          <select
            name="departamento_id"
            value={form.departamento_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departamentos.map((departamento) => (
              <option
                key={departamento.departamento_id}
                value={departamento.departamento_id}
              >
                {departamento.nombre_departamento}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del municipio</label>
          <br />
          <input
            type="text"
            name="nombre_municipio"
            value={form.nombre_municipio}
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
            <th>Departamento</th>
            <th>Nombre del municipio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {municipios.length > 0 ? (
            municipios.map((municipio) => (
              <tr key={municipio.municipio_id}>
                <td>{municipio.municipio_id}</td>
                <td>{municipio.nombre_departamento}</td>
                <td>{municipio.nombre_municipio}</td>
                <td>
                  <button onClick={() => editarMunicipio(municipio)}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarMunicipio(municipio.municipio_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay municipios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Municipio;