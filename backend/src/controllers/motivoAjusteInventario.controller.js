const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM motivos_ajuste_inventario");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener motivos de ajuste:", error);
    res.status(500).json({ error: "Error al obtener motivos de ajuste" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM motivos_ajuste_inventario WHERE motivo_ajuste_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Motivo de ajuste no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener motivo de ajuste:", error);
    res.status(500).json({ error: "Error al obtener motivo de ajuste" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { motivo_ajuste_id, nombre_motivo, descripcion, activo } = req.body;

    if (!motivo_ajuste_id || !nombre_motivo) {
      return res.status(400).json({
        error: "motivo_ajuste_id y nombre_motivo son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO motivos_ajuste_inventario
      (motivo_ajuste_id, nombre_motivo, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, NOW())`,
      [
        motivo_ajuste_id,
        nombre_motivo,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Motivo de ajuste creado correctamente" });
  } catch (error) {
    console.error("Error al crear motivo de ajuste:", error);
    res.status(500).json({ error: "Error al crear motivo de ajuste" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_motivo, descripcion, activo } = req.body;

    if (!nombre_motivo) {
      return res.status(400).json({
        error: "nombre_motivo es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE motivos_ajuste_inventario
       SET nombre_motivo = ?, descripcion = ?, activo = ?
       WHERE motivo_ajuste_id = ?`,
      [nombre_motivo, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Motivo de ajuste no encontrado" });
    }

    res.json({ message: "Motivo de ajuste actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar motivo de ajuste:", error);
    res.status(500).json({ error: "Error al actualizar motivo de ajuste" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM motivos_ajuste_inventario WHERE motivo_ajuste_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Motivo de ajuste no encontrado" });
    }

    res.json({ message: "Motivo de ajuste eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar motivo de ajuste:", error);
    res.status(500).json({ error: "Error al eliminar motivo de ajuste" });
  }
};