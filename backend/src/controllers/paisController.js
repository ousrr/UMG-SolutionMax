const db = require("../config/db");

const getPaises = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM pais ORDER BY pais_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener países:", error);
    res.status(500).json({
      message: "Error al obtener países",
      error: error.message,
    });
  }
};

const getPaisById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM pais WHERE pais_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "País no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener país:", error);
    res.status(500).json({
      message: "Error al obtener país",
      error: error.message,
    });
  }
};

const createPais = async (req, res) => {
  try {
    const { pais_id, nombre_pais } = req.body;

    if (!pais_id || !nombre_pais) {
      return res.status(400).json({
        message: "pais_id y nombre_pais son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM pais WHERE pais_id = ?",
      [pais_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un país con ese ID",
      });
    }

    await db.query(
      "INSERT INTO pais (pais_id, nombre_pais) VALUES (?, ?)",
      [pais_id, nombre_pais]
    );

    res.status(201).json({ message: "País creado correctamente" });
  } catch (error) {
    console.error("Error al crear país:", error);
    res.status(500).json({
      message: "Error al crear país",
      error: error.message,
    });
  }
};

const updatePais = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_pais } = req.body;

    const [rows] = await db.query(
      "UPDATE pais SET nombre_pais = ? WHERE pais_id = ?",
      [nombre_pais, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "País no encontrado" });
    }

    res.json({ message: "País actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar país:", error);
    res.status(500).json({
      message: "Error al actualizar país",
      error: error.message,
    });
  }
};

const deletePais = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM pais WHERE pais_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "País no encontrado" });
    }

    res.json({ message: "País eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar país:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este país está siendo usado por departamentos o direcciones",
      });
    }

    res.status(500).json({
      message: "Error al eliminar país",
      error: error.message,
    });
  }
};

module.exports = {
  getPaises,
  getPaisById,
  createPais,
  updatePais,
  deletePais,
};