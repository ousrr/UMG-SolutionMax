const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categorias_repuestos");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM categorias_repuestos WHERE categoria_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).json({ error: "Error al obtener categoría" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { categoria_id, nombre_categoria, descripcion } = req.body;

    if (!categoria_id || !nombre_categoria) {
      return res.status(400).json({
        error: "categoria_id y nombre_categoria son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO categorias_repuestos (categoria_id, nombre_categoria, descripcion) VALUES (?, ?, ?)",
      [categoria_id, nombre_categoria, descripcion || null]
    );

    res.status(201).json({ message: "Categoría creada correctamente" });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_categoria, descripcion } = req.body;

    if (!nombre_categoria) {
      return res.status(400).json({
        error: "nombre_categoria es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE categorias_repuestos SET nombre_categoria = ?, descripcion = ? WHERE categoria_id = ?",
      [nombre_categoria, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM categorias_repuestos WHERE categoria_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};