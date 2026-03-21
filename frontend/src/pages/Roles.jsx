import React, { useEffect, useState } from "react";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    rol_id: "",
    nombre_rol: "",
    descripcion: "",
    activo: 1,
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/roles";

  const obtenerRoles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "rol_id" || name === "activo" ? Number(value) : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      rol_id: "",
      nombre_rol: "",
      descripcion: "",
      activo: 1,
    });
    setEditando(false);
  };

  const guardarRol = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.rol_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_rol: form.nombre_rol,
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
      obtenerRoles();
    } catch (error) {
      console.error("Error al guardar rol:", error);
    }
  };

  const editarRol = (rol) => {
    setForm({
      rol_id: rol.rol_id,
      nombre_rol: rol.nombre_rol,
      descripcion: rol.descripcion || "",
      activo: rol.activo,
    });
    setEditando(true);
  };

  const eliminarRol = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este rol?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerRoles();
    } catch (error) {
      console.error("Error al eliminar rol:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Roles</h2>

      <form onSubmit={guardarRol} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID del rol</label>
          <br />
          <input
            type="number"
            name="rol_id"
            value={form.rol_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del rol</label>
          <br />
          <input
            type="text"
            name="nombre_rol"
            value={form.nombre_rol}
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

        <button type="submit">
          {editando ? "Actualizar" : "Guardar"}
        </button>

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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((rol) => (
              <tr key={rol.rol_id}>
                <td>{rol.rol_id}</td>
                <td>{rol.nombre_rol}</td>
                <td>{rol.descripcion}</td>
                <td>{rol.activo === 1 ? "Sí" : "No"}</td>
                <td>
                  <button onClick={() => editarRol(rol)}>Editar</button>
                  <button
                    onClick={() => eliminarRol(rol.rol_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay roles registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Roles;