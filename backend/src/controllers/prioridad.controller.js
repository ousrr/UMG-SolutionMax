const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cat_prioridad");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener prioridades:", error);
    res.status(500).json({ error: "Error al obtener prioridades" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_prioridad WHERE prioridad_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Prioridad no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener prioridad:", error);
    res.status(500).json({ error: "Error al obtener prioridad" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { prioridad_id, nombre, nivel, descripcion } = req.body;

    if (!prioridad_id || !nombre) {
      return res.status(400).json({
        error: "Los campos prioridad_id y nombre son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO cat_prioridad (prioridad_id, nombre, nivel, descripcion) VALUES (?, ?, ?, ?)",
      [prioridad_id, nombre, nivel || null, descripcion || null]
    );

    res.status(201).json({ message: "Prioridad creada correctamente" });
  } catch (error) {
    console.error("Error al crear prioridad:", error);
    res.status(500).json({ error: "Error al crear prioridad" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, nivel, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({
        error: "El campo nombre es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE cat_prioridad SET nombre = ?, nivel = ?, descripcion = ? WHERE prioridad_id = ?",
      [nombre, nivel || null, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prioridad no encontrada" });
    }

    res.json({ message: "Prioridad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar prioridad:", error);
    res.status(500).json({ error: "Error al actualizar prioridad" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM cat_prioridad WHERE prioridad_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prioridad no encontrada" });
    }

    res.json({ message: "Prioridad eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar prioridad:", error);
    res.status(500).json({ error: "Error al eliminar prioridad" });
  }
};