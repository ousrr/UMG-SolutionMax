const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tipos_proveedor");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de proveedor:", error);
    res.status(500).json({ error: "Error al obtener tipos de proveedor" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipos_proveedor WHERE tipo_proveedor_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tipo de proveedor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de proveedor:", error);
    res.status(500).json({ error: "Error al obtener tipo de proveedor" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { tipo_proveedor_id, nombre_tipo, descripcion } = req.body;

    if (!tipo_proveedor_id || !nombre_tipo) {
      return res.status(400).json({
        error: "tipo_proveedor_id y nombre_tipo son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO tipos_proveedor (tipo_proveedor_id, nombre_tipo, descripcion) VALUES (?, ?, ?)",
      [tipo_proveedor_id, nombre_tipo, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de proveedor creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de proveedor:", error);
    res.status(500).json({ error: "Error al crear tipo de proveedor" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion } = req.body;

    if (!nombre_tipo) {
      return res.status(400).json({
        error: "nombre_tipo es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE tipos_proveedor SET nombre_tipo = ?, descripcion = ? WHERE tipo_proveedor_id = ?",
      [nombre_tipo, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de proveedor no encontrado" });
    }

    res.json({ message: "Tipo de proveedor actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de proveedor:", error);
    res.status(500).json({ error: "Error al actualizar tipo de proveedor" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM tipos_proveedor WHERE tipo_proveedor_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de proveedor no encontrado" });
    }

    res.json({ message: "Tipo de proveedor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de proveedor:", error);
    res.status(500).json({ error: "Error al eliminar tipo de proveedor" });
  }
};