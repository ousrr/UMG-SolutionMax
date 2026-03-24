const db = require("../config/db");

const getAllTiposMovimientoInventario = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipos_movimiento_inventario ORDER BY tipo_movimiento_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de movimiento de inventario:", error);
    res.status(500).json({ message: "Error al obtener tipos de movimiento de inventario" });
  }
};

const getTipoMovimientoInventarioById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipos_movimiento_inventario WHERE tipo_movimiento_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de movimiento:", error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createTipoMovimientoInventario = async (req, res) => {
  try {
    const {
      tipo_movimiento_id,
      nombre_tipo,
      descripcion,
      naturaleza,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO tipos_movimiento_inventario
       (tipo_movimiento_id, nombre_tipo, descripcion, naturaleza, activo, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tipo_movimiento_id, nombre_tipo, descripcion, naturaleza, activo, created_at]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de movimiento:", error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateTipoMovimientoInventario = async (req, res) => {
  try {
    const { nombre_tipo, descripcion, naturaleza, activo, created_at } = req.body;

    const [result] = await db.query(
      `UPDATE tipos_movimiento_inventario
       SET nombre_tipo = ?, descripcion = ?, naturaleza = ?, activo = ?, created_at = ?
       WHERE tipo_movimiento_id = ?`,
      [nombre_tipo, descripcion, naturaleza, activo, created_at, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de movimiento:", error);
    res.status(500).json({ message: "Error al actualizar registro" });
  }
};

const deleteTipoMovimientoInventario = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM tipos_movimiento_inventario WHERE tipo_movimiento_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de movimiento:", error);
    res.status(500).json({ message: "No se pudo eliminar el registro" });
  }
};

module.exports = {
  getAllTiposMovimientoInventario,
  getTipoMovimientoInventarioById,
  createTipoMovimientoInventario,
  updateTipoMovimientoInventario,
  deleteTipoMovimientoInventario,
};
