const db = require("../config/db");

const getCombustiblesVehiculo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM combustible_vehiculo ORDER BY combustible_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener combustibles de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener combustibles de vehículo",
      error: error.message,
    });
  }
};

const getCombustibleVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM combustible_vehiculo WHERE combustible_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tipo de combustible no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener tipo de combustible:", error);
    res.status(500).json({
      message: "Error al obtener tipo de combustible",
      error: error.message,
    });
  }
};

const createCombustibleVehiculo = async (req, res) => {
  try {
    const { combustible_id, nombre_combustible, descripcion } = req.body;

    if (!combustible_id || !nombre_combustible) {
      return res.status(400).json({
        message: "combustible_id y nombre_combustible son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM combustible_vehiculo WHERE combustible_id = ?",
      [combustible_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un tipo de combustible con ese ID",
      });
    }

    await db.query(
      "INSERT INTO combustible_vehiculo (combustible_id, nombre_combustible, descripcion) VALUES (?, ?, ?)",
      [combustible_id, nombre_combustible, descripcion || null]
    );

    res.status(201).json({ message: "Tipo de combustible creado correctamente" });
  } catch (error) {
    console.error("Error al crear tipo de combustible:", error);
    res.status(500).json({
      message: "Error al crear tipo de combustible",
      error: error.message,
    });
  }
};

const updateCombustibleVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_combustible, descripcion } = req.body;

    const [rows] = await db.query(
      "UPDATE combustible_vehiculo SET nombre_combustible = ?, descripcion = ? WHERE combustible_id = ?",
      [nombre_combustible, descripcion || null, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de combustible no encontrado" });
    }

    res.json({ message: "Tipo de combustible actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de combustible:", error);
    res.status(500).json({
      message: "Error al actualizar tipo de combustible",
      error: error.message,
    });
  }
};

const deleteCombustibleVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM combustible_vehiculo WHERE combustible_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Tipo de combustible no encontrado" });
    }

    res.json({ message: "Tipo de combustible eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de combustible:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este tipo de combustible está siendo usado por vehículos",
      });
    }

    res.status(500).json({
      message: "Error al eliminar tipo de combustible",
      error: error.message,
    });
  }
};

module.exports = {
  getCombustiblesVehiculo,
  getCombustibleVehiculoById,
  createCombustibleVehiculo,
  updateCombustibleVehiculo,
  deleteCombustibleVehiculo,
};