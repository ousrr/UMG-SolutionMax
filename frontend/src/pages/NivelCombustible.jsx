import React, { useEffect, useState } from "react";

function NivelCombustible() {
  const [niveles, setNiveles] = useState([]);
  const [form, setForm] = useState({
    nivel_combustible_id: "",
    nombre_nivel: "",
    descripcion: "",
    activo: 1,
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/nivel-combustible";

  const obtenerNiveles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNiveles(data);
    } catch (error) {
      console.error("Error al obtener niveles:", error);
    }
  };

  useEffect(() => {
    obtenerNiveles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "nivel_combustible_id" || name === "activo"
          ? Number(value)
          : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      nivel_combustible_id: "",
      nombre_nivel: "",
      descripcion: "",
      activo: 1,
    });
    setEditando(false);
  };

  const guardarNivel = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.nivel_combustible_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_nivel: form.nombre_nivel,
            descripcion: form.descripcion,
            activo: form.activo,
          }),
        });

        const data = await res.json();
        alert(data.message);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        alert(data.message);
      }

      limpiarFormulario();
      obtenerNiveles();
    } catch (error) {
      console.error("Error al guardar nivel:", error);
    }
  };

  const editarNivel = (nivel) => {
    setForm({
      nivel_combustible_id: nivel.nivel_combustible_id,
      nombre_nivel: nivel.nombre_nivel,
      descripcion: nivel.descripcion || "",
      activo: nivel.activo,
    });
    setEditando(true);
  };

  const eliminarNivel = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este nivel de combustible?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerNiveles();
    } catch (error) {
      console.error("Error al eliminar nivel:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Nivel de Combustible</h2>

      <form onSubmit={guardarNivel} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="nivel_combustible_id"
            value={form.nivel_combustible_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="nombre_nivel"
            value={form.nombre_nivel}
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

        <div style={{ marginBottom: "10px" }}>
          <label>Activo</label>
          <br />
          <select name="activo" value={form.activo} onChange={handleChange}>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>

        <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
          Limpiar
        </button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {niveles.length > 0 ? (
            niveles.map((nivel) => (
              <tr key={nivel.nivel_combustible_id}>
                <td>{nivel.nivel_combustible_id}</td>
                <td>{nivel.nombre_nivel}</td>
                <td>{nivel.descripcion}</td>
                <td>{nivel.activo === 1 ? "Sí" : "No"}</td>
                <td>
                  <button onClick={() => editarNivel(nivel)}>Editar</button>
                  <button
                    onClick={() => eliminarNivel(nivel.nivel_combustible_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay niveles registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NivelCombustible;