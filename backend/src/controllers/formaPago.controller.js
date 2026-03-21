const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM formas_pago");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener formas de pago:", error);
    res.status(500).json({ error: "Error al obtener formas de pago" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM formas_pago WHERE forma_pago_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener forma de pago:", error);
    res.status(500).json({ error: "Error al obtener forma de pago" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { forma_pago_id, nombre, descripcion } = req.body;

    if (!forma_pago_id || !nombre) {
      return res.status(400).json({
        error: "forma_pago_id y nombre son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO formas_pago (forma_pago_id, nombre, descripcion) VALUES (?, ?, ?)",
      [forma_pago_id, nombre, descripcion || null]
    );

    res.status(201).json({ message: "Forma de pago creada correctamente" });
  } catch (error) {
    console.error("Error al crear forma de pago:", error);
    res.status(500).json({ error: "Error al crear forma de pago" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({
        error: "nombre es obligatorio",
      });
    }

    const [result] = await db.query(
      "UPDATE formas_pago SET nombre = ?, descripcion = ? WHERE forma_pago_id = ?",
      [nombre, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }

    res.json({ message: "Forma de pago actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar forma de pago:", error);
    res.status(500).json({ error: "Error al actualizar forma de pago" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM formas_pago WHERE forma_pago_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Forma de pago no encontrada" });
    }

    res.json({ message: "Forma de pago eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar forma de pago:", error);
    res.status(500).json({ error: "Error al eliminar forma de pago" });
  }
};