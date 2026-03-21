const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estados_repuesto");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de repuesto:", error);
    res.status(500).json({ error: "Error al obtener estados de repuesto" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estados_repuesto WHERE estado_repuesto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de repuesto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de repuesto:", error);
    res.status(500).json({ error: "Error al obtener estado de repuesto" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_repuesto_id, nombre_estado, descripcion, activo } = req.body;

    if (!estado_repuesto_id || !nombre_estado) {
      return res.status(400).json({
        error: "estado_repuesto_id y nombre_estado son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO estados_repuesto
      (estado_repuesto_id, nombre_estado, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, NOW())`,
      [estado_repuesto_id, nombre_estado, descripcion || null, activo || null]
    );

    res.status(201).json({ message: "Estado de repuesto creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de repuesto:", error);
    res.status(500).json({ error: "Error al crear estado de repuesto" });
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
      `UPDATE estados_repuesto
       SET nombre_estado = ?, descripcion = ?, activo = ?
       WHERE estado_repuesto_id = ?`,
      [nombre_estado, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de repuesto no encontrado" });
    }

    res.json({ message: "Estado de repuesto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de repuesto:", error);
    res.status(500).json({ error: "Error al actualizar estado de repuesto" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM estados_repuesto WHERE estado_repuesto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de repuesto no encontrado" });
    }

    res.json({ message: "Estado de repuesto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de repuesto:", error);
    res.status(500).json({ error: "Error al eliminar estado de repuesto" });
  }
};