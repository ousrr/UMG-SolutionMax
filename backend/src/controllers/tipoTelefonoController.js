const db = require("../config/db");

const getTiposTelefono = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipo_telefono ORDER BY tipo_telefono_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de teléfono:", error);
    res.status(500).json({
      message: "Error al obtener tipos de teléfono",
      error: error.message,
    });
  }
};

const getTipoTelefonoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipo_telefono WHERE tipo_telefono_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de teléfono no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de teléfono:", error);
    res.status(500).json({
      message: "Error al obtener tipo de teléfono",
      error: error.message,
    });
  }
};

const createTipoTelefono = async (req, res) => {
  try {
    const { tipo_telefono_id, nombre_tipo, descripcion } = req.body;

    if (!tipo_telefono_id || !nombre_tipo) {
      return res.status(400).json({
        message: "tipo_telefono_id y nombre_tipo son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM tipo_telefono WHERE tipo_telefono_id = ?",
      [tipo_telefono_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de teléfono con ese ID",
      });
    }

    await db.query(
      "INSERT INTO tipo_telefono (tipo_telefono_id, nombre_tipo, descripcion) VALUES (?, ?, ?)",
      [tipo_telefono_id, nombre_tipo, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de teléfono creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de teléfono:", error);
    res.status(500).json({
      message: "Error al crear tipo de teléfono",
      error: error.message,
    });
  }
};

const updateTipoTelefono = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE tipo_telefono SET nombre_tipo = ?, descripcion = ? WHERE tipo_telefono_id = ?",
      [nombre_tipo, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de teléfono no encontrado" });
    }

    res.json({ message: "Tipo de teléfono actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de teléfono:", error);
    res.status(500).json({
      message: "Error al actualizar tipo de teléfono",
      error: error.message,
    });
  }
};

const deleteTipoTelefono = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM tipo_telefono WHERE tipo_telefono_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de teléfono no encontrado" });
    }

    res.json({ message: "Tipo de teléfono eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de teléfono:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este tipo de teléfono está siendo usado por teléfonos de clientes",
      });
    }

    res.status(500).json({
      message: "Error al eliminar tipo de teléfono",
      error: error.message,
    });
  }
};

module.exports = {
  getTiposTelefono,
  getTipoTelefonoById,
  createTipoTelefono,
  updateTipoTelefono,
  deleteTipoTelefono,
};