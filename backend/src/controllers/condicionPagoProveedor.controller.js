const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM condiciones_pago_proveedor");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener condiciones:", error);
    res.status(500).json({ error: "Error al obtener condiciones" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM condiciones_pago_proveedor WHERE condicion_pago_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Condición no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener condición:", error);
    res.status(500).json({ error: "Error al obtener condición" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      condicion_pago_id,
      nombre_condicion,
      dias_credito,
      descripcion,
      activo,
    } = req.body;

    if (!condicion_pago_id || !nombre_condicion) {
      return res.status(400).json({
        error: "condicion_pago_id y nombre_condicion son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO condiciones_pago_proveedor
      (condicion_pago_id, nombre_condicion, dias_credito, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        condicion_pago_id,
        nombre_condicion,
        dias_credito || null,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Condición creada correctamente" });
  } catch (error) {
    console.error("Error al crear condición:", error);
    res.status(500).json({ error: "Error al crear condición" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_condicion, dias_credito, descripcion, activo } = req.body;

    if (!nombre_condicion) {
      return res.status(400).json({
        error: "nombre_condicion es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE condiciones_pago_proveedor
       SET nombre_condicion = ?, dias_credito = ?, descripcion = ?, activo = ?
       WHERE condicion_pago_id = ?`,
      [
        nombre_condicion,
        dias_credito || null,
        descripcion || null,
        activo || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Condición no encontrada" });
    }

    res.json({ message: "Condición actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar condición:", error);
    res.status(500).json({ error: "Error al actualizar condición" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM condiciones_pago_proveedor WHERE condicion_pago_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Condición no encontrada" });
    }

    res.json({ message: "Condición eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar condición:", error);
    res.status(500).json({ error: "Error al eliminar condición" });
  }
};