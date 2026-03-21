import { useEffect, useState } from "react";

function CategoriaRepuesto() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const obtenerCategorias = async () => {
    const res = await fetch("http://localhost:3001/api/categorias-repuestos");
    const data = await res.json();
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const limpiar = () => {
    setCategoriaId("");
    setNombreCategoria("");
    setDescripcion("");
    setEditandoId(null);
  };

  const guardar = async () => {
    if (editandoId) {
      await fetch(`http://localhost:3001/api/categorias-repuestos/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_categoria: nombreCategoria,
          descripcion,
        }),
      });
    } else {
      await fetch("http://localhost:3001/api/categorias-repuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria_id: categoriaId,
          nombre_categoria: nombreCategoria,
          descripcion,
        }),
      });
    }

    limpiar();
    obtenerCategorias();
  };

  const editar = (cat) => {
    setCategoriaId(cat.categoria_id);
    setNombreCategoria(cat.nombre_categoria);
    setDescripcion(cat.descripcion || "");
    setEditandoId(cat.categoria_id);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:3001/api/categorias-repuestos/${id}`, {
      method: "DELETE",
    });
    obtenerCategorias();
  };

  return (
    <div>
      <h2>Categorías de Repuestos</h2>

      {!editandoId && (
        <input
          placeholder="ID"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        />
      )}

      <input
        placeholder="Nombre"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button onClick={guardar}>
        {editandoId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {categorias.map((cat) => (
          <li key={cat.categoria_id}>
            {cat.nombre_categoria} - {cat.descripcion}
            <button onClick={() => editar(cat)}>Editar</button>
            <button onClick={() => eliminar(cat.categoria_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriaRepuesto;