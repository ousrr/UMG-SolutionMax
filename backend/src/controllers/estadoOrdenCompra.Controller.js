const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estados_orden_compra");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de orden de compra:", error);
    res.status(500).json({ error: "Error al obtener estados de orden de compra" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estados_orden_compra WHERE estado_orden_compra_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estado de orden de compra no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de orden de compra:", error);
    res.status(500).json({ error: "Error al obtener estado de orden de compra" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { estado_orden_compra_id, nombre_estado, descripcion, activo } = req.body;

    if (!estado_orden_compra_id || !nombre_estado) {
      return res.status(400).json({
        error: "estado_orden_compra_id y nombre_estado son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO estados_orden_compra
      (estado_orden_compra_id, nombre_estado, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, NOW())`,
      [
        estado_orden_compra_id,
        nombre_estado,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Estado de orden de compra creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de orden de compra:", error);
    res.status(500).json({ error: "Error al crear estado de orden de compra" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado, descripcion, activo } = req.body;

    if (!nombre_estado) {
      return res.status(400).json({
        error: "nombre_estado es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE estados_orden_compra
       SET nombre_estado = ?, descripcion = ?, activo = ?
       WHERE estado_orden_compra_id = ?`,
      [nombre_estado, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de orden de compra no encontrado" });
    }

    res.json({ message: "Estado de orden de compra actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de orden de compra:", error);
    res.status(500).json({ error: "Error al actualizar estado de orden de compra" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM estados_orden_compra WHERE estado_orden_compra_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estado de orden de compra no encontrado" });
    }

    res.json({ message: "Estado de orden de compra eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de orden de compra:", error);
    res.status(500).json({ error: "Error al eliminar estado de orden de compra" });
  }
};