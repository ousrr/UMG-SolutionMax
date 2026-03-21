const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM unidades_medida");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    res.status(500).json({ error: "Error al obtener unidades" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM unidades_medida WHERE unidad_medida_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Unidad no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener unidad:", error);
    res.status(500).json({ error: "Error al obtener unidad" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      unidad_medida_id,
      nombre_unidad,
      abreviatura,
      descripcion,
      activo,
    } = req.body;

    if (!unidad_medida_id || !nombre_unidad) {
      return res.status(400).json({
        error: "unidad_medida_id y nombre_unidad son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO unidades_medida
      (unidad_medida_id, nombre_unidad, abreviatura, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        unidad_medida_id,
        nombre_unidad,
        abreviatura || null,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Unidad creada correctamente" });
  } catch (error) {
    console.error("Error al crear unidad:", error);
    res.status(500).json({ error: "Error al crear unidad" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_unidad, abreviatura, descripcion, activo } = req.body;

    if (!nombre_unidad) {
      return res.status(400).json({
        error: "nombre_unidad es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE unidades_medida
       SET nombre_unidad = ?, abreviatura = ?, descripcion = ?, activo = ?
       WHERE unidad_medida_id = ?`,
      [nombre_unidad, abreviatura || null, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Unidad no encontrada" });
    }

    res.json({ message: "Unidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar unidad:", error);
    res.status(500).json({ error: "Error al actualizar unidad" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM unidades_medida WHERE unidad_medida_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Unidad no encontrada" });
    }

    res.json({ message: "Unidad eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar unidad:", error);
    res.status(500).json({ error: "Error al eliminar unidad" });
  }
};