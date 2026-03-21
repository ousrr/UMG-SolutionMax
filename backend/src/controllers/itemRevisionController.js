const db = require("../config/db");

// Obtener todos
const getItemsRevision = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cat_item_revision ORDER BY item_revision_id ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener ítems de revisión:", error);
    res.status(500).json({ message: "Error al obtener ítems de revisión" });
  }
};

// Obtener uno por ID
const getItemRevisionById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM cat_item_revision WHERE item_revision_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Ítem de revisión no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener ítem de revisión:", error);
    res.status(500).json({ message: "Error al obtener ítem de revisión" });
  }
};

// Crear
const createItemRevision = async (req, res) => {
  try {
    const { item_revision_id, nombre_item, descripcion, activo } = req.body;

    if (!item_revision_id || !nombre_item) {
      return res.status(400).json({
        message: "item_revision_id y nombre_item son obligatorios",
      });
    }

    const [existe] = await db.query(
      "SELECT * FROM cat_item_revision WHERE item_revision_id = ?",
      [item_revision_id]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Ya existe un ítem de revisión con ese ID",
      });
    }

    await db.query(
      `INSERT INTO cat_item_revision
       (item_revision_id, nombre_item, descripcion, activo)
       VALUES (?, ?, ?, ?)`,
      [item_revision_id, nombre_item, descripcion || null, activo ?? 1]
    );

    res.status(201).json({ message: "Ítem de revisión creado correctamente" });
  } catch (error) {
    console.error("Error al crear ítem de revisión:", error);
    res.status(500).json({ message: "Error al crear ítem de revisión" });
  }
};

// Actualizar
const updateItemRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_item, descripcion, activo } = req.body;

    const [existe] = await db.query(
      "SELECT * FROM cat_item_revision WHERE item_revision_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Ítem de revisión no encontrado" });
    }

    await db.query(
      `UPDATE cat_item_revision
       SET nombre_item = ?, descripcion = ?, activo = ?
       WHERE item_revision_id = ?`,
      [nombre_item, descripcion || null, activo, id]
    );

    res.json({ message: "Ítem de revisión actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar ítem de revisión:", error);
    res.status(500).json({ message: "Error al actualizar ítem de revisión" });
  }
};

// Eliminar
const deleteItemRevision = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query(
      "SELECT * FROM cat_item_revision WHERE item_revision_id = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Ítem de revisión no encontrado" });
    }

    await db.query(
      "DELETE FROM cat_item_revision WHERE item_revision_id = ?",
      [id]
    );

    res.json({ message: "Ítem de revisión eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar ítem de revisión:", error);
    res.status(500).json({ message: "Error al eliminar ítem de revisión" });
  }
};

module.exports = {
  getItemsRevision,
  getItemRevisionById,
  createItemRevision,
  updateItemRevision,
  deleteItemRevision,
};