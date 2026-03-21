const db = require("../config/db");

const getTiposCita = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipo_cita ORDER BY tipo_cita_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de cita:", error);
    res.status(500).json({ message: "Error al obtener tipos de cita" });
  }
};

const getTipoCitaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipo_cita WHERE tipo_cita_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de cita no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de cita:", error);
    res.status(500).json({ message: "Error al obtener tipo de cita" });
  }
};

const createTipoCita = async (req, res) => {
  try {
    const { tipo_cita_id, nombre, descripcion } = req.body;

    if (!tipo_cita_id || !nombre) {
      return res.status(400).json({
        message: "tipo_cita_id y nombre son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM tipo_cita WHERE tipo_cita_id = ?",
      [tipo_cita_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de cita con ese ID",
      });
    }

    await db.query(
      "INSERT INTO tipo_cita (tipo_cita_id, nombre, descripcion) VALUES (?, ?, ?)",
      [tipo_cita_id, nombre, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de cita creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de cita:", error);
    res.status(500).json({ message: "Error al crear tipo de cita" });
  }
};

const updateTipoCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE tipo_cita SET nombre = ?, descripcion = ? WHERE tipo_cita_id = ?",
      [nombre, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de cita no encontrado" });
    }

    res.json({ message: "Tipo de cita actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de cita:", error);
    res.status(500).json({ message: "Error al actualizar tipo de cita" });
  }
};

const deleteTipoCita = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM tipo_cita WHERE tipo_cita_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de cita no encontrado" });
    }

    res.json({ message: "Tipo de cita eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de cita:", error);
    res.status(500).json({ message: "Error al eliminar tipo de cita" });
  }
};

module.exports = {
  getTiposCita,
  getTipoCitaById,
  createTipoCita,
  updateTipoCita,
  deleteTipoCita,
};