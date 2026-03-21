const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM servicios");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM servicios WHERE servicio_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(500).json({ error: "Error al obtener servicio" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      servicio_id,
      tipo_servicio_id,
      nombre_servicio,
      descripcion,
      precio_base,
    } = req.body;

    if (!servicio_id || !nombre_servicio) {
      return res.status(400).json({
        error: "Los campos servicio_id y nombre_servicio son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO servicios 
      (servicio_id, tipo_servicio_id, nombre_servicio, descripcion, precio_base) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        servicio_id,
        tipo_servicio_id || null,
        nombre_servicio,
        descripcion || null,
        precio_base || null,
      ]
    );

    res.status(201).json({ message: "Servicio creado correctamente" });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ error: "Error al crear servicio" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tipo_servicio_id,
      nombre_servicio,
      descripcion,
      precio_base,
    } = req.body;

    if (!nombre_servicio) {
      return res.status(400).json({
        error: "El campo nombre_servicio es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE servicios 
       SET tipo_servicio_id = ?, nombre_servicio = ?, descripcion = ?, precio_base = ?
       WHERE servicio_id = ?`,
      [
        tipo_servicio_id || null,
        nombre_servicio,
        descripcion || null,
        precio_base || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json({ message: "Servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM servicios WHERE servicio_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};