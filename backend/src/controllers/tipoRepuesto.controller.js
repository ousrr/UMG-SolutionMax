const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tipos_repuesto");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de repuesto:", error);
    res.status(500).json({ error: "Error al obtener tipos de repuesto" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipos_repuesto WHERE tipo_repuesto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tipo de repuesto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de repuesto:", error);
    res.status(500).json({ error: "Error al obtener tipo de repuesto" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { tipo_repuesto_id, nombre_tipo, descripcion, activo } = req.body;

    if (!tipo_repuesto_id || !nombre_tipo) {
      return res.status(400).json({
        error: "tipo_repuesto_id y nombre_tipo son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO tipos_repuesto
      (tipo_repuesto_id, nombre_tipo, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, NOW())`,
      [
        tipo_repuesto_id,
        nombre_tipo,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Tipo de repuesto creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de repuesto:", error);
    res.status(500).json({ error: "Error al crear tipo de repuesto" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion, activo } = req.body;

    if (!nombre_tipo) {
      return res.status(400).json({
        error: "nombre_tipo es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE tipos_repuesto
       SET nombre_tipo = ?, descripcion = ?, activo = ?
       WHERE tipo_repuesto_id = ?`,
      [nombre_tipo, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de repuesto no encontrado" });
    }

    res.json({ message: "Tipo de repuesto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de repuesto:", error);
    res.status(500).json({ error: "Error al actualizar tipo de repuesto" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM tipos_repuesto WHERE tipo_repuesto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tipo de repuesto no encontrado" });
    }

    res.json({ message: "Tipo de repuesto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de repuesto:", error);
    res.status(500).json({ error: "Error al eliminar tipo de repuesto" });
  }
};