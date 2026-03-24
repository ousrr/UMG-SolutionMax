const db = require("../config/db");

const getAllEstadosRepuesto = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_repuesto ORDER BY estado_repuesto_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de repuesto:", error);
    res.status(500).json({ message: "Error al obtener estados de repuesto" });
  }
};

const getEstadoRepuestoById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_repuesto WHERE estado_repuesto_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de repuesto:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createEstadoRepuesto = async (req, res) => {
  try {
    const {
      estado_repuesto_id,
      nombre_estado,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO estados_repuesto 
       (estado_repuesto_id, nombre_estado, descripcion, activo, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      [estado_repuesto_id, nombre_estado, descripcion, activo, created_at]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de repuesto:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateEstadoRepuesto = async (req, res) => {
  try {
    const { nombre_estado, descripcion, activo, created_at } = req.body;

    const [result] = await db.query(
      `UPDATE estados_repuesto 
       SET nombre_estado = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE estado_repuesto_id = ?`,
      [nombre_estado, descripcion, activo, created_at, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de repuesto:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteEstadoRepuesto = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM estados_repuesto WHERE estado_repuesto_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de repuesto:", error);
    res.status(500).json({
      message: "No se pudo eliminar el registro",
    });
  }
};

module.exports = {
  getAllEstadosRepuesto,
  getEstadoRepuestoById,
  createEstadoRepuesto,
  updateEstadoRepuesto,
  deleteEstadoRepuesto,
};