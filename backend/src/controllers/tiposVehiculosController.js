const db = require("../config/db");

const getTiposVehiculos = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tipos_vehiculos ORDER BY tipo_vehiculo_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tipos de vehículos:", error);
    res.status(500).json({
      message: "Error al obtener tipos de vehículos",
      error: error.message,
    });
  }
};

const getTipoVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tipos_vehiculos WHERE tipo_vehiculo_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener tipo de vehículo",
      error: error.message,
    });
  }
};

const createTipoVehiculo = async (req, res) => {
  try {
    const { tipo_vehiculo_id, nombre_tipo, descripcion } = req.body;

    if (!tipo_vehiculo_id || !nombre_tipo) {
      return res.status(400).json({
        message: "tipo_vehiculo_id y nombre_tipo son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM tipos_vehiculos WHERE tipo_vehiculo_id = ?",
      [tipo_vehiculo_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de vehículo con ese ID",
      });
    }

    await db.query(
      "INSERT INTO tipos_vehiculos (tipo_vehiculo_id, nombre_tipo, descripcion) VALUES (?, ?, ?)",
      [tipo_vehiculo_id, nombre_tipo, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de vehículo creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de vehículo:", error);
    res.status(500).json({
      message: "Error al crear tipo de vehículo",
      error: error.message,
    });
  }
};

const updateTipoVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE tipos_vehiculos SET nombre_tipo = ?, descripcion = ? WHERE tipo_vehiculo_id = ?",
      [nombre_tipo, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    }

    res.json({ message: "Tipo de vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de vehículo:", error);
    res.status(500).json({
      message: "Error al actualizar tipo de vehículo",
      error: error.message,
    });
  }
};

const deleteTipoVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM tipos_vehiculos WHERE tipo_vehiculo_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    }

    res.json({ message: "Tipo de vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de vehículo:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este tipo de vehículo está siendo usado por vehículos",
      });
    }

    res.status(500).json({
      message: "Error al eliminar tipo de vehículo",
      error: error.message,
    });
  }
};

module.exports = {
  getTiposVehiculos,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo,
};