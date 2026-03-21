const db = require("../config/db");

// Obtener todos
const getNivelesCombustible = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cat_nivel_combustible ORDER BY nivel_combustible_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener niveles de combustible:", error);
    res.status(500).json({ message: "Error al obtener niveles de combustible" });
  }
};

// Obtener uno por ID
const getNivelCombustibleById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_nivel_combustible WHERE nivel_combustible_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Nivel de combustible no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener nivel de combustible:", error);
    res.status(500).json({ message: "Error al obtener nivel de combustible" });
  }
};

// Crear
const createNivelCombustible = async (req, res) => {
  try {
    const { nivel_combustible_id, nombre_nivel, descripcion, activo } = req.body;

    if (!nivel_combustible_id || !nombre_nivel) {
      return res.status(400).json({
        message: "nivel_combustible_id y nombre_nivel son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM cat_nivel_combustible WHERE nivel_combustible_id = ?",
      [nivel_combustible_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un nivel de combustible con ese ID",
      });
    }

    await db.query(
      `INSERT INTO cat_nivel_combustible
       (nivel_combustible_id, nombre_nivel, descripcion, activo)
       VALUES (?, ?, ?, ?)`,
      [nivel_combustible_id, nombre_nivel, descripcion || null, activo ?? 1]
    );

    res.status(201).json({ message: "Nivel de combustible creado correctamente" });
  } catch (error) {
    console.error("Error al crear nivel de combustible:", error);
    res.status(500).json({ message: "Error al crear nivel de combustible" });
  }
};

// Actualizar
const updateNivelCombustible = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_nivel, descripcion, activo } = req.body;

    const [existe] = await db.query(
      "SELECT * FROM cat_nivel_combustible WHERE nivel_combustible_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Nivel de combustible no encontrado" });
    }

    await db.query(
      `UPDATE cat_nivel_combustible
       SET nombre_nivel = ?, descripcion = ?, activo = ?
       WHERE nivel_combustible_id = ?`,
      [nombre_nivel, descripcion || null, activo, id]
    );

    res.json({ message: "Nivel de combustible actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar nivel de combustible:", error);
    res.status(500).json({ message: "Error al actualizar nivel de combustible" });
  }
};

// Eliminar
const deleteNivelCombustible = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query(
      "SELECT * FROM cat_nivel_combustible WHERE nivel_combustible_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Nivel de combustible no encontrado" });
    }

    await db.query(
      "DELETE FROM cat_nivel_combustible WHERE nivel_combustible_id = ?",
      [id]
    );

    res.json({ message: "Nivel de combustible eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar nivel de combustible:", error);
    res.status(500).json({ message: "Error al eliminar nivel de combustible" });
  }
};

module.exports = {
  getNivelesCombustible,
  getNivelCombustibleById,
  createNivelCombustible,
  updateNivelCombustible,
  deleteNivelCombustible,
};