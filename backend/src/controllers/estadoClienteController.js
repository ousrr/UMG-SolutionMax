const db = require("../config/db");

const getEstadosCliente = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM estado_cliente ORDER BY estado_cliente_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener estados de cliente:", error);
    res.status(500).json({
      message: "Error al obtener estados de cliente",
      error: error.message,
    });
  }
};

const getEstadoClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM estado_cliente WHERE estado_cliente_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Estado de cliente no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estado de cliente:", error);
    res.status(500).json({
      message: "Error al obtener estado de cliente",
      error: error.message,
    });
  }
};

const createEstadoCliente = async (req, res) => {
  try {
    const { estado_cliente_id, nombre_estado, descripcion, activo } = req.body;

    if (!estado_cliente_id || !nombre_estado || !activo) {
      return res.status(400).json({
        message: "estado_cliente_id, nombre_estado y activo son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM estado_cliente WHERE estado_cliente_id = ?",
      [estado_cliente_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un estado de cliente con ese ID",
      });
    }

    await db.query(
      "INSERT INTO estado_cliente (estado_cliente_id, nombre_estado, descripcion, activo) VALUES (?, ?, ?, ?)",
      [estado_cliente_id, nombre_estado, descripcion || null, activo]
    );

    res.status(201).json({ message: "Estado de cliente creado correctamente" });
  } catch (error) {
    console.error("Error al crear estado de cliente:", error);
    res.status(500).json({
      message: "Error al crear estado de cliente",
      error: error.message,
    });
  }
};

const updateEstadoCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado, descripcion, activo } = req.body;

    const [rows] = await db.query(
      "UPDATE estado_cliente SET nombre_estado = ?, descripcion = ?, activo = ? WHERE estado_cliente_id = ?",
      [nombre_estado, descripcion || null, activo, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado de cliente no encontrado" });
    }

    res.json({ message: "Estado de cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado de cliente:", error);
    res.status(500).json({
      message: "Error al actualizar estado de cliente",
      error: error.message,
    });
  }
};

const deleteEstadoCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM estado_cliente WHERE estado_cliente_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Estado de cliente no encontrado" });
    }

    res.json({ message: "Estado de cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado de cliente:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este estado de cliente está siendo usado por clientes",
      });
    }

    res.status(500).json({
      message: "Error al eliminar estado de cliente",
      error: error.message,
    });
  }
};

module.exports = {
  getEstadosCliente,
  getEstadoClienteById,
  createEstadoCliente,
  updateEstadoCliente,
  deleteEstadoCliente,
};