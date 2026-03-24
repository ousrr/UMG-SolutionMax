const db = require("../config/db");

const getAllEstadosPago = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_pago ORDER BY estado_pago_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de pago:", error);
    res.status(500).json({ message: "Error al obtener estados de pago" });
  }
};

const getEstadoPagoById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_pago WHERE estado_pago_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de pago:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createEstadoPago = async (req, res) => {
  try {
    const { estado_pago_id, nombre, descripcion } = req.body;

    await db.query(
      `INSERT INTO estados_pago
       (estado_pago_id, nombre, descripcion)
       VALUES (?, ?, ?)`,
      [estado_pago_id, nombre, descripcion]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de pago:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateEstadoPago = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const [result] = await db.query(
      `UPDATE estados_pago
       SET nombre = ?, descripcion = ?
       WHERE estado_pago_id = ?`,
      [nombre, descripcion, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de pago:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteEstadoPago = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM estados_pago WHERE estado_pago_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de pago:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllEstadosPago,
  getEstadoPagoById,
  createEstadoPago,
  updateEstadoPago,
  deleteEstadoPago,
};