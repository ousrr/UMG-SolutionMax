const db = require("../config/db");

const getTiposServicio = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cat_tipo_servicio ORDER BY tipo_servicio_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de servicio:", error);
    res.status(500).json({
      message: "Error al obtener tipos de servicio",
      error: error.message,
    });
  }
};

const getTipoServicioById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_tipo_servicio WHERE tipo_servicio_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de servicio no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de servicio:", error);
    res.status(500).json({
      message: "Error al obtener tipo de servicio",
      error: error.message,
    });
  }
};

const createTipoServicio = async (req, res) => {
  try {
    const { tipo_servicio_id, nombre_tipo, descripcion } = req.body;

    if (!tipo_servicio_id || !nombre_tipo) {
      return res.status(400).json({
        message: "tipo_servicio_id y nombre_tipo son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM cat_tipo_servicio WHERE tipo_servicio_id = ?",
      [tipo_servicio_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de servicio con ese ID",
      });
    }

    await db.query(
      "INSERT INTO cat_tipo_servicio (tipo_servicio_id, nombre_tipo, descripcion) VALUES (?, ?, ?)",
      [tipo_servicio_id, nombre_tipo, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de servicio creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de servicio:", error);
    res.status(500).json({
      message: "Error al crear tipo de servicio",
      error: error.message,
    });
  }
};

const updateTipoServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE cat_tipo_servicio SET nombre_tipo = ?, descripcion = ? WHERE tipo_servicio_id = ?",
      [nombre_tipo, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de servicio no encontrado" });
    }

    res.json({ message: "Tipo de servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de servicio:", error);
    res.status(500).json({
      message: "Error al actualizar tipo de servicio",
      error: error.message,
    });
  }
};

const deleteTipoServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM cat_tipo_servicio WHERE tipo_servicio_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de servicio no encontrado" });
    }

    res.json({ message: "Tipo de servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de servicio:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este tipo de servicio está siendo usado por servicios",
      });
    }

    res.status(500).json({
      message: "Error al eliminar tipo de servicio",
      error: error.message,
    });
  }
};

module.exports = {
  getTiposServicio,
  getTipoServicioById,
  createTipoServicio,
  updateTipoServicio,
  deleteTipoServicio,
};