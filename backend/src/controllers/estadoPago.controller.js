const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estados_pago");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de pago:", error);
    res.status(500).json({ error: "Error al obtener estados de pago" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estados_pago WHERE estado_pago_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de pago no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de pago:", error);
    res.status(500).json({ error: "Error al obtener estado de pago" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_pago_id, nombre, descripcion } = req.body;

    if (!estado_pago_id || !nombre) {
      return res.status(400).json({
        error: "estado_pago_id y nombre son obligatorios",
      });
    }

    await db.query(
      "INSERT INTO estados_pago (estado_pago_id, nombre, descripcion) VALUES (?, ?, ?)",
      [estado_pago_id, nombre, descripcion || null]
    );

    res.status(201).json({ message: "Estado de pago creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de pago:", error);
    res.status(500).json({ error: "Error al crear estado de pago" });
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
      "UPDATE estados_pago SET nombre = ?, descripcion = ? WHERE estado_pago_id = ?",
      [nombre, descripcion || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de pago no encontrado" });
    }

    res.json({ message: "Estado de pago actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de pago:", error);
    res.status(500).json({ error: "Error al actualizar estado de pago" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM estados_pago WHERE estado_pago_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de pago no encontrado" });
    }

    res.json({ message: "Estado de pago eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de pago:", error);
    res.status(500).json({ error: "Error al eliminar estado de pago" });
  }
};