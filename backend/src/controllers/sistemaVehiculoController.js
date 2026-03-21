const db = require("../config/db");

const getSistemasVehiculo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cat_sistema_vehiculo ORDER BY sistema_vehiculo_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener sistemas del vehículo:", error);
    res.status(500).json({
      message: "Error al obtener sistemas del vehículo",
      error: error.message,
    });
  }
};

const getSistemaVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_sistema_vehiculo WHERE sistema_vehiculo_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Sistema del vehículo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener sistema del vehículo:", error);
    res.status(500).json({
      message: "Error al obtener sistema del vehículo",
      error: error.message,
    });
  }
};

const createSistemaVehiculo = async (req, res) => {
  try {
    const { sistema_vehiculo_id, nombre_sistema } = req.body;

    if (!sistema_vehiculo_id || !nombre_sistema) {
      return res.status(400).json({
        message: "sistema_vehiculo_id y nombre_sistema son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM cat_sistema_vehiculo WHERE sistema_vehiculo_id = ?",
      [sistema_vehiculo_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un sistema del vehículo con ese ID",
      });
    }

    await db.query(
      "INSERT INTO cat_sistema_vehiculo (sistema_vehiculo_id, nombre_sistema) VALUES (?, ?)",
      [sistema_vehiculo_id, nombre_sistema]
    );

    res.status(201).json({ message: "Sistema del vehículo creado correctamente" });
  } catch (error) {
    console.error("Error al crear sistema del vehículo:", error);
    res.status(500).json({
      message: "Error al crear sistema del vehículo",
      error: error.message,
    });
  }
};

const updateSistemaVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_sistema } = req.body;

    const [rows] = await db.query(
      "UPDATE cat_sistema_vehiculo SET nombre_sistema = ? WHERE sistema_vehiculo_id = ?",
      [nombre_sistema, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Sistema del vehículo no encontrado" });
    }

    res.json({ message: "Sistema del vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar sistema del vehículo:", error);
    res.status(500).json({
      message: "Error al actualizar sistema del vehículo",
      error: error.message,
    });
  }
};

const deleteSistemaVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM cat_sistema_vehiculo WHERE sistema_vehiculo_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Sistema del vehículo no encontrado" });
    }

    res.json({ message: "Sistema del vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar sistema del vehículo:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este sistema está siendo usado en diagnósticos",
      });
    }

    res.status(500).json({
      message: "Error al eliminar sistema del vehículo",
      error: error.message,
    });
  }
};

module.exports = {
  getSistemasVehiculo,
  getSistemaVehiculoById,
  createSistemaVehiculo,
  updateSistemaVehiculo,
  deleteSistemaVehiculo,
};