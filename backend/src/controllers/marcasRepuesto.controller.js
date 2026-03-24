const db = require("../config/db");

const getAllMarcasRepuesto = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marcas_repuesto ORDER BY marca_repuesto_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener marcas de repuesto:", error);
    res.status(500).json({ message: "Error al obtener marcas de repuesto" });
  }
};

const getMarcaRepuestoById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marcas_repuesto WHERE marca_repuesto_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener marca de repuesto:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createMarcaRepuesto = async (req, res) => {
  try {
    const {
      marca_repuesto_id,
      nombre_marca,
      pais_origen,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO marcas_repuesto
       (marca_repuesto_id, nombre_marca, pais_origen, descripcion, activo, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        marca_repuesto_id,
        nombre_marca,
        pais_origen,
        descripcion,
        activo,
        created_at,
      ]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear marca de repuesto:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateMarcaRepuesto = async (req, res) => {
  try {
    const { nombre_marca, pais_origen, descripcion, activo, created_at } =
      req.body;

    const [result] = await db.query(
      `UPDATE marcas_repuesto
       SET nombre_marca = ?, pais_origen = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE marca_repuesto_id = ?`,
      [
        nombre_marca,
        pais_origen,
        descripcion,
        activo,
        created_at,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar marca de repuesto:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteMarcaRepuesto = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM marcas_repuesto WHERE marca_repuesto_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar marca de repuesto:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllMarcasRepuesto,
  getMarcaRepuestoById,
  createMarcaRepuesto,
  updateMarcaRepuesto,
  deleteMarcaRepuesto,
};