const db = require("../config/db");

const getDepartamentos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.departamento_id, d.pais_id, p.nombre_pais, d.nombre_departamento
       FROM departamento d
       INNER JOIN pais p ON d.pais_id = p.pais_id
       ORDER BY d.departamento_id ASC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({
      message: "Error al obtener departamentos",
      error: error.message,
    });
  }
};

const getDepartamentoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT d.departamento_id, d.pais_id, p.nombre_pais, d.nombre_departamento
       FROM departamento d
       INNER JOIN pais p ON d.pais_id = p.pais_id
       WHERE d.departamento_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener departamento:", error);
    res.status(500).json({
      message: "Error al obtener departamento",
      error: error.message,
    });
  }
};

const createDepartamento = async (req, res) => {
  try {
    const { departamento_id, pais_id, nombre_departamento } = req.body;

    if (!departamento_id || !pais_id || !nombre_departamento) {
      return res.status(400).json({
        message: "departamento_id, pais_id y nombre_departamento son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM departamento WHERE departamento_id = ?",
      [departamento_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un departamento con ese ID",
      });
    }

    await db.query(
      "INSERT INTO departamento (departamento_id, pais_id, nombre_departamento) VALUES (?, ?, ?)",
      [departamento_id, pais_id, nombre_departamento]
    );

    res.status(201).json({ message: "Departamento creado correctamente" });
  } catch (error) {
    console.error("Error al crear departamento:", error);
    res.status(500).json({
      message: "Error al crear departamento",
      error: error.message,
    });
  }
};

const updateDepartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { pais_id, nombre_departamento } = req.body;

    const [rows] = await db.query(
      "UPDATE departamento SET pais_id = ?, nombre_departamento = ? WHERE departamento_id = ?",
      [pais_id, nombre_departamento, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    res.json({ message: "Departamento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar departamento:", error);
    res.status(500).json({
      message: "Error al actualizar departamento",
      error: error.message,
    });
  }
};

const deleteDepartamento = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "DELETE FROM departamento WHERE departamento_id = ?",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    res.json({ message: "Departamento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar departamento:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar porque este departamento está siendo usado por municipios o direcciones",
      });
    }

    res.status(500).json({
      message: "Error al eliminar departamento",
      error: error.message,
    });
  }
};

module.exports = {
  getDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};