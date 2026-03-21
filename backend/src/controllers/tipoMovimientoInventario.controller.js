const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tipos_movimiento_inventario");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de movimiento:", error);
    res.status(500).json({ error: "Error al obtener tipos de movimiento" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipos_movimiento_inventario WHERE tipo_movimiento_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de movimiento:", error);
    res.status(500).json({ error: "Error al obtener tipo de movimiento" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      tipo_movimiento_id,
      nombre_tipo,
      descripcion,
      naturaleza,
      activo,
    } = req.body;

    if (!tipo_movimiento_id || !nombre_tipo) {
      return res.status(400).json({
        error: "tipo_movimiento_id y nombre_tipo son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO tipos_movimiento_inventario
      (tipo_movimiento_id, nombre_tipo, descripcion, naturaleza, activo, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        tipo_movimiento_id,
        nombre_tipo,
        descripcion || null,
        naturaleza || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Tipo de movimiento creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de movimiento:", error);
    res.status(500).json({ error: "Error al crear tipo de movimiento" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion, naturaleza, activo } = req.body;

    if (!nombre_tipo) {
      return res.status(400).json({
        error: "nombre_tipo es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE tipos_movimiento_inventario
       SET nombre_tipo = ?, descripcion = ?, naturaleza = ?, activo = ?
       WHERE tipo_movimiento_id = ?`,
      [nombre_tipo, descripcion || null, naturaleza || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }

    res.json({ message: "Tipo de movimiento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de movimiento:", error);
    res.status(500).json({ error: "Error al actualizar tipo de movimiento" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM tipos_movimiento_inventario WHERE tipo_movimiento_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }

    res.json({ message: "Tipo de movimiento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de movimiento:", error);
    res.status(500).json({ error: "Error al eliminar tipo de movimiento" });
  }
};