const db = require("../config/db");

const getEstadosCita = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estado_cita ORDER BY estado_cita_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de cita:", error);
    res.status(500).json({ message: "Error al obtener estados de cita", error: error.message });
  }
};

const getEstadoCitaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estado_cita WHERE estado_cita_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estado de cita no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de cita:", error);
    res.status(500).json({ message: "Error al obtener estado de cita", error: error.message });
  }
};

const createEstadoCita = async (req, res) => {
  try {
    const { estado_cita_id, nombre, descripcion } = req.body;

    if (!estado_cita_id || !nombre) {
      return res.status(400).json({
        message: "estado_cita_id y nombre son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM estado_cita WHERE estado_cita_id = ?",
      [estado_cita_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un estado de cita con ese ID",
      });
    }

    await db.query(
      "INSERT INTO estado_cita (estado_cita_id, nombre, descripcion) VALUES (?, ?, ?)",
      [estado_cita_id, nombre, descripcion || null]
    );

    res.status(201).json({ message: "Estado de cita creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de cita:", error);
    res.status(500).json({ message: "Error al crear estado de cita", error: error.message });
  }
};

const updateEstadoCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE estado_cita SET nombre = ?, descripcion = ? WHERE estado_cita_id = ?",
      [nombre, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado de cita no encontrado" });
    }

    res.json({ message: "Estado de cita actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de cita:", error);
    res.status(500).json({ message: "Error al actualizar estado de cita", error: error.message });
  }
};

const deleteEstadoCita = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM estado_cita WHERE estado_cita_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado de cita no encontrado" });
    }

    res.json({ message: "Estado de cita eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de cita:", error);
    res.status(500).json({ message: "Error al eliminar estado de cita", error: error.message });
  }
};

module.exports = {
  getEstadosCita,
  getEstadoCitaById,
  createEstadoCita,
  updateEstadoCita,
  deleteEstadoCita,
};