import { useEffect, useState } from "react";

function EstadoCliente() {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargar = () => {
    fetch("http://localhost:3001/api/estado-cliente")
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = () => {
    fetch("http://localhost:3001/api/estado-cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre_estado: nombre })
    }).then(() => {
      setNombre("");
      cargar();
    });
  };

  return (
    <div>
      <h2>Estado Cliente</h2>

      <input onChange={(e) => setNombre(e.target.value)} />
      <button onClick={guardar}>Guardar</button>

      <ul>
        {data.map((item) => (
          <li key={item.id_estado_cliente}>
            {item.nombre_estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstadoCliente;