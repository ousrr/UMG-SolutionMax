const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marcas_repuesto");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener marcas de repuesto:", error);
    res.status(500).json({ error: "Error al obtener marcas de repuesto" });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM marcas_repuesto WHERE marca_repuesto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Marca de repuesto no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener marca de repuesto:", error);
    res.status(500).json({ error: "Error al obtener marca de repuesto" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      marca_repuesto_id,
      nombre_marca,
      pais_origen,
      descripcion,
      activo,
    } = req.body;

    if (!marca_repuesto_id || !nombre_marca) {
      return res.status(400).json({
        error: "marca_repuesto_id y nombre_marca son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO marcas_repuesto
      (marca_repuesto_id, nombre_marca, pais_origen, descripcion, activo, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        marca_repuesto_id,
        nombre_marca,
        pais_origen || null,
        descripcion || null,
        activo || null,
      ]
    );

    res.status(201).json({ message: "Marca de repuesto creada correctamente" });
  } catch (error) {
    console.error("Error al crear marca de repuesto:", error);
    res.status(500).json({ error: "Error al crear marca de repuesto" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_marca, pais_origen, descripcion, activo } = req.body;

    if (!nombre_marca) {
      return res.status(400).json({
        error: "nombre_marca es obligatorio",
      });
    }

    const [result] = await db.query(
      `UPDATE marcas_repuesto
       SET nombre_marca = ?, pais_origen = ?, descripcion = ?, activo = ?
       WHERE marca_repuesto_id = ?`,
      [nombre_marca, pais_origen || null, descripcion || null, activo || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Marca de repuesto no encontrada" });
    }

    res.json({ message: "Marca de repuesto actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar marca de repuesto:", error);
    res.status(500).json({ error: "Error al actualizar marca de repuesto" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM marcas_repuesto WHERE marca_repuesto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Marca de repuesto no encontrada" });
    }

    res.json({ message: "Marca de repuesto eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar marca de repuesto:", error);
    res.status(500).json({ error: "Error al eliminar marca de repuesto" });
  }
};