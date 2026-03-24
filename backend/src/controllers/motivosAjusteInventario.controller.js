const db = require("../config/db");

const getAllMotivosAjusteInventario = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM motivos_ajuste_inventario ORDER BY motivo_ajuste_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener motivos de ajuste:", error);
    res.status(500).json({ message: "Error al obtener motivos de ajuste" });
  }
};

const getMotivoAjusteInventarioById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM motivos_ajuste_inventario WHERE motivo_ajuste_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener motivo de ajuste:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createMotivoAjusteInventario = async (req, res) => {
  try {
    const {
      motivo_ajuste_id,
      nombre_motivo,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO motivos_ajuste_inventario
       (motivo_ajuste_id, nombre_motivo, descripcion, activo, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [motivo_ajuste_id, nombre_motivo, descripcion, activo, created_at]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear motivo de ajuste:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateMotivoAjusteInventario = async (req, res) => {
  try {
    const { nombre_motivo, descripcion, activo, created_at } = req.body;

    const [result] = await db.query(
      `UPDATE motivos_ajuste_inventario
       SET nombre_motivo = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE motivo_ajuste_id = ?`,
      [nombre_motivo, descripcion, activo, created_at, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar motivo de ajuste:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteMotivoAjusteInventario = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM motivos_ajuste_inventario WHERE motivo_ajuste_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar motivo de ajuste:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllMotivosAjusteInventario,
  getMotivoAjusteInventarioById,
  createMotivoAjusteInventario,
  updateMotivoAjusteInventario,
  deleteMotivoAjusteInventario,
};