const db = require("../config/db");

// GET ALL
exports.getAll = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM estado_cliente");
  res.json(rows);
};

// CREATE
exports.create = async (req, res) => {
  const { nombre_estado } = req.body;

  await db.query(
    "INSERT INTO estado_cliente (nombre_estado) VALUES (?)",
    [nombre_estado]
  );

  res.json({ message: "Creado" });
};

// UPDATE
exports.update = async (req, res) => {
  const { nombre_estado } = req.body;

  await db.query(
    "UPDATE estado_cliente SET nombre_estado = ? WHERE id_estado_cliente = ?",
    [nombre_estado, req.params.id]
  );

  res.json({ message: "Actualizado" });
};

// DELETE
exports.remove = async (req, res) => {
  await db.query(
    "DELETE FROM estado_cliente WHERE id_estado_cliente = ?",
    [req.params.id]
  );

  res.json({ message: "Eliminado" });
}; 
