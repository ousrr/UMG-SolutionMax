const db = require("../config/db");

const getEstadosFisicos = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cat_estado_fisico ORDER BY estado_fisico_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados físicos:", error);
    res.status(500).json({
      message: "Error al obtener estados físicos",
      error: error.message,
    });
  }
};

const getEstadoFisicoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_estado_fisico WHERE estado_fisico_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estado físico no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado físico:", error);
    res.status(500).json({
      message: "Error al obtener estado físico",
      error: error.message,
    });
  }
};

const createEstadoFisico = async (req, res) => {
  try {
    const { estado_fisico_id, descripcion } = req.body;

    if (!estado_fisico_id || !descripcion) {
      return res.status(400).json({
        message: "estado_fisico_id y descripcion son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM cat_estado_fisico WHERE estado_fisico_id = ?",
      [estado_fisico_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un estado físico con ese ID",
      });
    }

    await db.query(
      "INSERT INTO cat_estado_fisico (estado_fisico_id, descripcion) VALUES (?, ?)",
      [estado_fisico_id, descripcion]
    );

    res.status(201).json({ message: "Estado físico creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado físico:", error);
    res.status(500).json({
      message: "Error al crear estado físico",
      error: error.message,
    });
  }
};

const updateEstadoFisico = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE cat_estado_fisico SET descripcion = ? WHERE estado_fisico_id = ?",
      [descripcion, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado físico no encontrado" });
    }

    res.json({ message: "Estado físico actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado físico:", error);
    res.status(500).json({
      message: "Error al actualizar estado físico",
      error: error.message,
    });
  }
};

const deleteEstadoFisico = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM cat_estado_fisico WHERE estado_fisico_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado físico no encontrado" });
    }

    res.json({ message: "Estado físico eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado físico:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este estado físico está siendo usado en diagnósticos",
      });
    }

    res.status(500).json({
      message: "Error al eliminar estado físico",
      error: error.message,
    });
  }
};

module.exports = {
  getEstadosFisicos,
  getEstadoFisicoById,
  createEstadoFisico,
  updateEstadoFisico,
  deleteEstadoFisico,
};