const db = require("../config/db");

const getAllUnidadesMedida = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM unidades_medida ORDER BY unidad_medida_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener unidades de medida:", error);
    res.status(500).json({ message: "Error al obtener unidades de medida" });
  }
};

const getUnidadMedidaById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM unidades_medida WHERE unidad_medida_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener unidad de medida:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createUnidadMedida = async (req, res) => {
  try {
    const {
      unidad_medida_id,
      nombre_unidad,
      abreviatura,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO unidades_medida
       (unidad_medida_id, nombre_unidad, abreviatura, descripcion, activo, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        unidad_medida_id,
        nombre_unidad,
        abreviatura,
        descripcion,
        activo,
        created_at,
      ]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear unidad de medida:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateUnidadMedida = async (req, res) => {
  try {
    const { nombre_unidad, abreviatura, descripcion, activo, created_at } =
      req.body;

    const [result] = await db.query(
      `UPDATE unidades_medida
       SET nombre_unidad = ?, abreviatura = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE unidad_medida_id = ?`,
      [
        nombre_unidad,
        abreviatura,
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
    console.error("Error al actualizar unidad de medida:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteUnidadMedida = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM unidades_medida WHERE unidad_medida_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar unidad de medida:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllUnidadesMedida,
  getUnidadMedidaById,
  createUnidadMedida,
  updateUnidadMedida,
  deleteUnidadMedida,
};