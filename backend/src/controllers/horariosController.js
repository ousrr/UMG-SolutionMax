const db = require("../config/db");

const getHorarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM horarios ORDER BY id_horario ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    res.status(500).json({ message: "Error al obtener horarios" });
  }
};

const getHorarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM horarios WHERE id_horario = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener horario:", error);
    res.status(500).json({ message: "Error al obtener horario" });
  }
};

const createHorario = async (req, res) => {
  try {
    const { id_horario, hora_inicio, hora_fin } = req.body;

    if (!id_horario || !hora_inicio || !hora_fin) {
      return res.status(400).json({
        message: "id_horario, hora_inicio y hora_fin son obligatorios",
      });
    }

    const [existe] = await db.query("SELECT * FROM horarios WHERE id_horario = ?", [id_horario]);

    if (existe.length > 0) {
      return res.status(400).json({ message: "Ya existe un horario con ese ID" });
    }

    await db.query(
      "INSERT INTO horarios (id_horario, hora_inicio, hora_fin) VALUES (?, ?, ?)",
      [id_horario, hora_inicio, hora_fin]
    );

    res.status(201).json({ message: "Horario creado correctamente" });
  } catch (error) {
    console.error("Error al crear horario:", error);
    res.status(500).json({ message: "Error al crear horario" });
  }
};

const updateHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { hora_inicio, hora_fin } = req.body;

    const [existe] = await db.query("SELECT * FROM horarios WHERE id_horario = ?", [id]);

    if (existe.length === 0) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    await db.query(
      "UPDATE horarios SET hora_inicio = ?, hora_fin = ? WHERE id_horario = ?",
      [hora_inicio, hora_fin, id]
    );

    res.json({ message: "Horario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar horario:", error);
    res.status(500).json({ message: "Error al actualizar horario" });
  }
};

const deleteHorario = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query("SELECT * FROM horarios WHERE id_horario = ?", [id]);

    if (existe.length === 0) {
      return res.status(404).json({ message: "Horario no encontrado" });
    }

    await db.query("DELETE FROM horarios WHERE id_horario = ?", [id]);

    res.json({ message: "Horario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    res.status(500).json({ message: "Error al eliminar horario" });
  }
};

module.exports = {
  getHorarios,
  getHorarioById,
  createHorario,
  updateHorario,
  deleteHorario,
};