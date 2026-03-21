const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estados_tarea");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de tarea:", error);
    res.status(500).json({ error: "Error al obtener estados de tarea" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estados_tarea WHERE estado_tarea_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de tarea no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de tarea:", error);
    res.status(500).json({ error: "Error al obtener estado de tarea" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_tarea_id, nombre_estado, descripcion } = req.body;

    if (!estado_tarea_id || !nombre_estado) {
      return res.status(400).json({
        error: "estado_tarea_id y nombre_estado son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO estados_tarea (estado_tarea_id, nombre_estado, descripcion) VALUES (?, ?, ?)",
      [estado_tarea_id, nombre_estado, descripcion || null]
    );

    res.status(201).json({ message: "Estado de tarea creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de tarea:", error);
    res.status(500).json({ error: "Error al crear estado de tarea" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado, descripcion } = req.body;

    if (!nombre_estado) {
      return res.status(400).json({
        error: "nombre_estado es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE estados_tarea SET nombre_estado = ?, descripcion = ? WHERE estado_tarea_id = ?",
      [nombre_estado, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de tarea no encontrado" });
    }

    res.json({ message: "Estado de tarea actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de tarea:", error);
    res.status(500).json({ error: "Error al actualizar estado de tarea" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM estados_tarea WHERE estado_tarea_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de tarea no encontrado" });
    }

    res.json({ message: "Estado de tarea eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de tarea:", error);
    res.status(500).json({ error: "Error al eliminar estado de tarea" });
  }
};