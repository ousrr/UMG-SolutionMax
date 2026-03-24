const db = require("../config/db");

const getAllEstadosOrdenCompra = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_orden_compra ORDER BY estado_orden_compra_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de orden de compra:", error);
    res.status(500).json({ message: "Error al obtener estados" });
  }
};

const getEstadoOrdenCompraById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estados_orden_compra WHERE estado_orden_compra_id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener registro" });
  }
};

const createEstadoOrdenCompra = async (req, res) => {
  try {
    const {
      estado_orden_compra_id,
      nombre_estado,
      descripcion,
      activo,
      created_at,
    } = req.body;

    await db.query(
      `INSERT INTO estados_orden_compra
       (estado_orden_compra_id, nombre_estado, descripcion, activo, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [estado_orden_compra_id, nombre_estado, descripcion, activo, created_at]
    );

    res.status(201).json({ message: "Registro creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear registro" });
  }
};

const updateEstadoOrdenCompra = async (req, res) => {
  try {
    const { nombre_estado, descripcion, activo, created_at } = req.body;

    const [result] = await db.query(
      `UPDATE estados_orden_compra
       SET nombre_estado = ?, descripcion = ?, activo = ?, created_at = ?
       WHERE estado_orden_compra_id = ?`,
      [nombre_estado, descripcion, activo, created_at, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar" });
  }
};

const deleteEstadoOrdenCompra = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM estados_orden_compra WHERE estado_orden_compra_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo eliminar" });
  }
};

module.exports = {
  getAllEstadosOrdenCompra,
  getEstadoOrdenCompraById,
  createEstadoOrdenCompra,
  updateEstadoOrdenCompra,
  deleteEstadoOrdenCompra,
};