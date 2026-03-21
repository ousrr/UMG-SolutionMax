const db = require("../config/db");

const getTiposCliente = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipo_cliente ORDER BY tipo_cliente_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de cliente:", error);
    res.status(500).json({
      message: "Error al obtener tipos de cliente",
      error: error.message,
    });
  }
};

const getTipoClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipo_cliente WHERE tipo_cliente_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de cliente:", error);
    res.status(500).json({
      message: "Error al obtener tipo de cliente",
      error: error.message,
    });
  }
};

const createTipoCliente = async (req, res) => {
  try {
    const { tipo_cliente_id, nombre_tipo, descripcion } = req.body;

    if (!tipo_cliente_id || !nombre_tipo) {
      return res.status(400).json({
        message: "tipo_cliente_id y nombre_tipo son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM tipo_cliente WHERE tipo_cliente_id = ?",
      [tipo_cliente_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de cliente con ese ID",
      });
    }

    await db.query(
      "INSERT INTO tipo_cliente (tipo_cliente_id, nombre_tipo, descripcion) VALUES (?, ?, ?)",
      [tipo_cliente_id, nombre_tipo, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de cliente creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de cliente:", error);
    res.status(500).json({
      message: "Error al crear tipo de cliente",
      error: error.message,
    });
  }
};

const updateTipoCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE tipo_cliente SET nombre_tipo = ?, descripcion = ? WHERE tipo_cliente_id = ?",
      [nombre_tipo, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de cliente no encontrado" });
    }

    res.json({ message: "Tipo de cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de cliente:", error);
    res.status(500).json({
      message: "Error al actualizar tipo de cliente",
      error: error.message,
    });
  }
};

const deleteTipoCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM tipo_cliente WHERE tipo_cliente_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de cliente no encontrado" });
    }

    res.json({ message: "Tipo de cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de cliente:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este tipo de cliente está siendo usado por clientes",
      });
    }

    res.status(500).json({
      message: "Error al eliminar tipo de cliente",
      error: error.message,
    });
  }
};

module.exports = {
  getTiposCliente,
  getTipoClienteById,
  createTipoCliente,
  updateTipoCliente,
  deleteTipoCliente,
};