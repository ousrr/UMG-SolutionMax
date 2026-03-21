import React, { useEffect, useState } from "react";

function ItemRevision() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    item_revision_id: "",
    nombre_item: "",
    descripcion: "",
    activo: 1,
  });
  const [editando, setEditando] = useState(false);

  const API_URL = "http://localhost:3000/api/item-revision";

  const obtenerItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error al obtener ítems:", error);
    }
  };

  useEffect(() => {
    obtenerItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "item_revision_id" || name === "activo"
          ? Number(value)
          : value,
    });
  };

  const limpiarFormulario = () => {
    setForm({
      item_revision_id: "",
      nombre_item: "",
      descripcion: "",
      activo: 1,
    });
    setEditando(false);
  };

  const guardarItem = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const res = await fetch(`${API_URL}/${form.item_revision_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_item: form.nombre_item,
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
      obtenerItems();
    } catch (error) {
      console.error("Error al guardar ítem:", error);
    }
  };

  const editarItem = (item) => {
    setForm({
      item_revision_id: item.item_revision_id,
      nombre_item: item.nombre_item,
      descripcion: item.descripcion || "",
      activo: item.activo,
    });
    setEditando(true);
  };

  const eliminarItem = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este ítem de revisión?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      obtenerItems();
    } catch (error) {
      console.error("Error al eliminar ítem:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD de Ítems de Revisión</h2>

      <form onSubmit={guardarItem} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label>
          <br />
          <input
            type="number"
            name="item_revision_id"
            value={form.item_revision_id}
            onChange={handleChange}
            disabled={editando}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nombre del ítem</label>
          <br />
          <input
            type="text"
            name="nombre_item"
            value={form.nombre_item}
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
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.item_revision_id}>
                <td>{item.item_revision_id}</td>
                <td>{item.nombre_item}</td>
                <td>{item.descripcion}</td>
                <td>{item.activo === 1 ? "Sí" : "No"}</td>
                <td>
                  <button onClick={() => editarItem(item)}>Editar</button>
                  <button
                    onClick={() => eliminarItem(item.item_revision_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay ítems registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemRevision;