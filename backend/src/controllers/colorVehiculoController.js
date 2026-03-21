const db = require("../config/db");

const getColoresVehiculo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM color_vehiculo ORDER BY color_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener colores de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener colores de vehículo",
      error: error.message,
    });
  }
};

const getColorVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM color_vehiculo WHERE color_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Color de vehículo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener color de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener color de vehículo",
      error: error.message,
    });
  }
};

const createColorVehiculo = async (req, res) => {
  try {
    const { color_id, nombre_color, descripcion } = req.body;

    if (!color_id || !nombre_color) {
      return res.status(400).json({
        message: "color_id y nombre_color son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM color_vehiculo WHERE color_id = ?",
      [color_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un color de vehículo con ese ID",
      });
    }

    await db.query(
      "INSERT INTO color_vehiculo (color_id, nombre_color, descripcion) VALUES (?, ?, ?)",
      [color_id, nombre_color, descripcion || null]
    );

    res.status(201).json({ message: "Color de vehículo creado correctamente" });
  } catch (error) {
    console.error("Error al crear color de vehículo:", error);
    res.status(500).json({
      message: "Error al crear color de vehículo",
      error: error.message,
    });
  }
};

const updateColorVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_color, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE color_vehiculo SET nombre_color = ?, descripcion = ? WHERE color_id = ?",
      [nombre_color, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Color de vehículo no encontrado" });
    }

    res.json({ message: "Color de vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar color de vehículo:", error);
    res.status(500).json({
      message: "Error al actualizar color de vehículo",
      error: error.message,
    });
  }
};

const deleteColorVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM color_vehiculo WHERE color_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Color de vehículo no encontrado" });
    }

    res.json({ message: "Color de vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar color de vehículo:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este color está siendo usado por vehículos",
      });
    }

    res.status(500).json({
      message: "Error al eliminar color de vehículo",
      error: error.message,
    });
  }
};

module.exports = {
  getColoresVehiculo,
  getColorVehiculoById,
  createColorVehiculo,
  updateColorVehiculo,
  deleteColorVehiculo,
};