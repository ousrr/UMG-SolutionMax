const db = require("../config/db");

const getMunicipios = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.municipio_id, m.departamento_id, d.nombre_departamento, m.nombre_municipio
       FROM municipio m
       INNER JOIN departamento d ON m.departamento_id = d.departamento_id
       ORDER BY m.municipio_id ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener municipios:", error);
    res.status(500).json({
      message: "Error al obtener municipios",
      error: error.message,
    });
  }
};

const getMunicipioById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT m.municipio_id, m.departamento_id, d.nombre_departamento, m.nombre_municipio
       FROM municipio m
       INNER JOIN departamento d ON m.departamento_id = d.departamento_id
       WHERE m.municipio_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Municipio no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener municipio:", error);
    res.status(500).json({
      message: "Error al obtener municipio",
      error: error.message,
    });
  }
};

const createMunicipio = async (req, res) => {
  try {
    const { municipio_id, departamento_id, nombre_municipio } = req.body;

    if (!municipio_id || !departamento_id || !nombre_municipio) {
      return res.status(400).json({
        message: "municipio_id, departamento_id y nombre_municipio son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM municipio WHERE municipio_id = ?",
      [municipio_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un municipio con ese ID",
      });
    }

    await db.query(
      "INSERT INTO municipio (municipio_id, departamento_id, nombre_municipio) VALUES (?, ?, ?)",
      [municipio_id, departamento_id, nombre_municipio]
    );

    res.status(201).json({ message: "Municipio creado correctamente" });
  } catch (error) {
    console.error("Error al crear municipio:", error);
    res.status(500).json({
      message: "Error al crear municipio",
      error: error.message,
    });
  }
};

const updateMunicipio = async (req, res) => {
  try {
    const { id } = req.params;
    const { departamento_id, nombre_municipio } = req.body;

    const [rows] = await db.query(
      "UPDATE municipio SET departamento_id = ?, nombre_municipio = ? WHERE municipio_id = ?",
      [departamento_id, nombre_municipio, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Municipio no encontrado" });
    }

    res.json({ message: "Municipio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar municipio:", error);
    res.status(500).json({
      message: "Error al actualizar municipio",
      error: error.message,
    });
  }
};

const deleteMunicipio = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM municipio WHERE municipio_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Municipio no encontrado" });
    }

    res.json({ message: "Municipio eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar municipio:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este municipio está siendo usado por direcciones",
      });
    }

    res.status(500).json({
      message: "Error al eliminar municipio",
      error: error.message,
    });
  }
};

module.exports = {
  getMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
};