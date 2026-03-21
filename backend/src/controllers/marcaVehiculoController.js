const db = require("../config/db");

const getMarcasVehiculo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marca_vehiculo ORDER BY marca_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener marcas de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener marcas de vehículo",
      error: error.message,
    });
  }
};

const getMarcaVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM marca_vehiculo WHERE marca_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Marca de vehículo no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener marca de vehículo:", error);
    res.status(500).json({
      message: "Error al obtener marca de vehículo",
      error: error.message,
    });
  }
};

const createMarcaVehiculo = async (req, res) => {
  try {
    const { marca_id, nombre_marca, pais_origen } = req.body;

    if (!marca_id || !nombre_marca || !pais_origen) {
      return res.status(400).json({
        message: "marca_id, nombre_marca y pais_origen son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM marca_vehiculo WHERE marca_id = ?",
      [marca_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe una marca de vehículo con ese ID",
      });
    }

    await db.query(
      "INSERT INTO marca_vehiculo (marca_id, nombre_marca, pais_origen) VALUES (?, ?, ?)",
      [marca_id, nombre_marca, pais_origen]
    );

    res.status(201).json({ message: "Marca de vehículo creada correctamente" });
  } catch (error) {
    console.error("Error al crear marca de vehículo:", error);
    res.status(500).json({
      message: "Error al crear marca de vehículo",
      error: error.message,
    });
  }
};

const updateMarcaVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_marca, pais_origen } = req.body;

    const [rows] = await db.query(
      "UPDATE marca_vehiculo SET nombre_marca = ?, pais_origen = ? WHERE marca_id = ?",
      [nombre_marca, pais_origen, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Marca de vehículo no encontrada" });
    }

    res.json({ message: "Marca de vehículo actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar marca de vehículo:", error);
    res.status(500).json({
      message: "Error al actualizar marca de vehículo",
      error: error.message,
    });
  }
};

const deleteMarcaVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM marca_vehiculo WHERE marca_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Marca de vehículo no encontrada" });
    }

    res.json({ message: "Marca de vehículo eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar marca de vehículo:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque esta marca está siendo usada por modelos de vehículo",
      });
    }

    res.status(500).json({
      message: "Error al eliminar marca de vehículo",
      error: error.message,
    });
  }
};

module.exports = {
  getMarcasVehiculo,
  getMarcaVehiculoById,
  createMarcaVehiculo,
  updateMarcaVehiculo,
  deleteMarcaVehiculo,
};