const db = require("../config/db");

const getAllEstadosTarea = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_tarea ORDER BY estado_tarea_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de tarea:", error);
    res.status(500).json({ message: "Error al obtener estados de tarea" });
  }
};

const getEstadoTareaById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_tarea WHERE estado_tarea_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de tarea:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createEstadoTarea = async (req, res) => {
  try {
    const { estado_tarea_id, nombre_estado, descripcion } = req.body;

    await db.query(
      `INSERT INTO estados_tarea
       (estado_tarea_id, nombre_estado, descripcion)
       VALUES (?, ?, ?)`,
      [estado_tarea_id, nombre_estado, descripcion]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de tarea:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateEstadoTarea = async (req, res) => {
  try {
    const { nombre_estado, descripcion } = req.body;

    const [result] = await db.query(
      `UPDATE estados_tarea
       SET nombre_estado = ?, descripcion = ?
       WHERE estado_tarea_id = ?`,
      [nombre_estado, descripcion, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de tarea:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteEstadoTarea = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM estados_tarea WHERE estado_tarea_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de tarea:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllEstadosTarea,
  getEstadoTareaById,
  createEstadoTarea,
  updateEstadoTarea,
  deleteEstadoTarea,
};