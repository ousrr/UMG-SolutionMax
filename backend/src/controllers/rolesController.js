const db = require("../config/db");

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roles ORDER BY rol_id ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM roles WHERE rol_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener rol:", error);
    res.status(500).json({ message: "Error al obtener rol" });
  }
};

// Crear rol
const createRol = async (req, res) => {
  try {
    const { rol_id, nombre_rol, descripcion, activo } = req.body;

    if (!rol_id || !nombre_rol) {
      return res.status(400).json({
        message: "rol_id y nombre_rol son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM roles WHERE rol_id = ?",
      [rol_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un rol con ese ID",
      });
    }

    await db.query(
      "INSERT INTO roles (rol_id, nombre_rol, descripcion, activo) VALUES (?, ?, ?, ?)",
      [rol_id, nombre_rol, descripcion || null, activo ?? 1]
    );

    res.status(201).json({ message: "Rol creado correctamente" });
  } catch (error) {
    console.error("Error al crear rol:", error);
    res.status(500).json({ message: "Error al crear rol" });
  }
};

// Actualizar rol
const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_rol, descripcion, activo } = req.body;

    const [existe] = await db.query(
      "SELECT * FROM roles WHERE rol_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await db.query(
      "UPDATE roles SET nombre_rol = ?, descripcion = ?, activo = ? WHERE rol_id = ?",
      [nombre_rol, descripcion || null, activo, id]
    );

    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ message: "Error al actualizar rol" });
  }
};

// Eliminar rol
const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query(
      "SELECT * FROM roles WHERE rol_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await db.query("DELETE FROM roles WHERE rol_id = ?", [id]);

    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar rol:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        message: "No se puede eliminar el rol porque está siendo utilizado",
      });
    }

    res.status(500).json({ message: "Error al eliminar rol" });
  }
};

module.exports = {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
};