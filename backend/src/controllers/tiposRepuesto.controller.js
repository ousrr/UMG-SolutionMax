const db = require("../config/db");

const getAllTiposRepuesto = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipos_repuesto ORDER BY tipo_repuesto_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de repuesto:", error);
    res.status(500).json({ message: "Error al obtener tipos de repuesto" });
  }
};

const getTipoRepuestoById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipos_repuesto WHERE tipo_repuesto_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de repuesto:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createTipoRepuesto = async (req, res) => {
  try {
    const {
      tipo_repuesto_id,
      nombre_tipo,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO tipos_repuesto
       (tipo_repuesto_id, nombre_tipo, descripcion, activo, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [tipo_repuesto_id, nombre_tipo, descripcion, activo, created_at]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de repuesto:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateTipoRepuesto = async (req, res) => {
  try {
    const { nombre_tipo, descripcion, activo, created_at } = req.body;

    const [result] = await db.query(
      `UPDATE tipos_repuesto
       SET nombre_tipo = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE tipo_repuesto_id = ?`,
      [nombre_tipo, descripcion, activo, created_at, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de repuesto:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteTipoRepuesto = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM tipos_repuesto WHERE tipo_repuesto_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de repuesto:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllTiposRepuesto,
  getTipoRepuestoById,
  createTipoRepuesto,
  updateTipoRepuesto,
  deleteTipoRepuesto,
};