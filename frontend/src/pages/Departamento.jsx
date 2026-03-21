import React, { useEffect, useState } from "react";

function Departamento() {
  const [departamentos, setDepartamentos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [form, setForm] = useState({
    departamento_id: "",
    pais_id: "",
    nombre_departamento: "",
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/departamento";
  const API_PAISES = "http://localhost:3000/api/pais";

  const obtenerDepartamentos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDepartamentos(data);
    } catch (error) {
      console.error("Error al obtener departamentos:", error);
    }
  };

  const obtenerPaises = async () => {
    try {
      const res = await fetch(API_PAISES);
      const data = await res.json();
      setPaises(data);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  useEffect(() => {
    obtenerDepartamentos();
    obtenerPaises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "departamento_id" || name === "pais_id"
          ? Number(value)
          : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      departamento_id: "",
      pais_id: "",
      nombre_departamento: "",
    });
    setEditando(false);
  };

  const guardarDepartamento = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.departamento_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pais_id: form.pais_id,
            nombre_departamento: form.nombre_departamento,
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
      obtenerDepartamentos();
    } catch (error) {
      console.error("Error al guardar departamento:", error);
    }
  };

  const editarDepartamento = (departamento) => {
    setForm({
      departamento_id: departamento.departamento_id,
      pais_id: departamento.pais_id,
      nombre_departamento: departamento.nombre_departamento,
    });
    setEditando(true);
  };

  const eliminarDepartamento = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este departamento?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerDepartamentos();
    } catch (error) {
      console.error("Error al eliminar departamento:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Departamentos</h2>

      <form onSubmit={guardarDepartamento} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="departamento_id"
            value={form.departamento_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>País</label>
          <br />
          <select
            name="pais_id"
            value={form.pais_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.pais_id} value={pais.pais_id}>
                {pais.nombre_pais}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del departamento</label>
          <br />
          <input
            type="text"
            name="nombre_departamento"
            value={form.nombre_departamento}
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
            <th>País</th>
            <th>Nombre del departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.length > 0 ? (
            departamentos.map((departamento) => (
              <tr key={departamento.departamento_id}>
                <td>{departamento.departamento_id}</td>
                <td>{departamento.nombre_pais}</td>
                <td>{departamento.nombre_departamento}</td>
                <td>
                  <button onClick={() => editarDepartamento(departamento)}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarDepartamento(departamento.departamento_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay departamentos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Departamento;