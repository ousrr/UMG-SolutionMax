const db = require("../config/db");

const getAllFormasPago = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM formas_pago ORDER BY forma_pago_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener formas de pago:", error);
    res.status(500).json({ message: "Error al obtener formas de pago" });
  }
};

const getFormaPagoById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM formas_pago WHERE forma_pago_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener forma de pago:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createFormaPago = async (req, res) => {
  try {
    const { forma_pago_id, nombre, descripcion } = req.body;

    await db.query(
      `INSERT INTO formas_pago
       (forma_pago_id, nombre, descripcion)
       VALUES (?, ?, ?)`,
      [forma_pago_id, nombre, descripcion]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear forma de pago:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateFormaPago = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const [result] = await db.query(
      `UPDATE formas_pago
       SET nombre = ?, descripcion = ?
       WHERE forma_pago_id = ?`,
      [nombre, descripcion, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar forma de pago:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteFormaPago = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM formas_pago WHERE forma_pago_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar forma de pago:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllFormasPago,
  getFormaPagoById,
  createFormaPago,
  updateFormaPago,
  deleteFormaPago,
};