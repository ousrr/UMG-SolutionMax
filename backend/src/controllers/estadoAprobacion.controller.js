const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cat_estado_aprobacion");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de aprobación:", error);
    res.status(500).json({ error: "Error al obtener estados de aprobación" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_estado_aprobacion WHERE estado_aprobacion_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de aprobación no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de aprobación:", error);
    res.status(500).json({ error: "Error al obtener estado de aprobación" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_aprobacion_id, nombre_estado, descripcion } = req.body;

    if (!estado_aprobacion_id || !nombre_estado) {
      return res.status(400).json({
        error: "Los campos estado_aprobacion_id y nombre_estado son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO cat_estado_aprobacion (estado_aprobacion_id, nombre_estado, descripcion) VALUES (?, ?, ?)",
      [estado_aprobacion_id, nombre_estado, descripcion || null]
    );

    res.status(201).json({ message: "Estado de aprobación creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de aprobación:", error);
    res.status(500).json({ error: "Error al crear estado de aprobación" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado, descripcion } = req.body;

    if (!nombre_estado) {
      return res.status(400).json({
        error: "El campo nombre_estado es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE cat_estado_aprobacion SET nombre_estado = ?, descripcion = ? WHERE estado_aprobacion_id = ?",
      [nombre_estado, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de aprobación no encontrado" });
    }

    res.json({ message: "Estado de aprobación actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de aprobación:", error);
    res.status(500).json({ error: "Error al actualizar estado de aprobación" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM cat_estado_aprobacion WHERE estado_aprobacion_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de aprobación no encontrado" });
    }

    res.json({ message: "Estado de aprobación eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de aprobación:", error);
    res.status(500).json({ error: "Error al eliminar estado de aprobación" });
  }
};