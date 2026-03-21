const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estados_proveedor");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de proveedor:", error);
    res.status(500).json({ error: "Error al obtener estados de proveedor" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estados_proveedor WHERE estado_proveedor_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de proveedor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de proveedor:", error);
    res.status(500).json({ error: "Error al obtener estado de proveedor" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_proveedor_id, nombre_estado, descripcion, activo } = req.body;

    if (!estado_proveedor_id || !nombre_estado) {
      return res.status(400).json({
        error: "estado_proveedor_id y nombre_estado son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO estados_proveedor (estado_proveedor_id, nombre_estado, descripcion, activo) VALUES (?, ?, ?, ?)",
      [estado_proveedor_id, nombre_estado, descripcion || null, activo || null]
    );

    res.status(201).json({ message: "Estado de proveedor creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de proveedor:", error);
    res.status(500).json({ error: "Error al crear estado de proveedor" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado, descripcion, activo } = req.body;

    if (!nombre_estado) {
      return res.status(400).json({
        error: "nombre_estado es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE estados_proveedor SET nombre_estado = ?, descripcion = ?, activo = ? WHERE estado_proveedor_id = ?",
      [nombre_estado, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de proveedor no encontrado" });
    }

    res.json({ message: "Estado de proveedor actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de proveedor:", error);
    res.status(500).json({ error: "Error al actualizar estado de proveedor" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM estados_proveedor WHERE estado_proveedor_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de proveedor no encontrado" });
    }

    res.json({ message: "Estado de proveedor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de proveedor:", error);
    res.status(500).json({ error: "Error al eliminar estado de proveedor" });
  }
};