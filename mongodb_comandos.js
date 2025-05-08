/* Inserción masiva de registros simulados */
for (let i = 1; i <= 100; i++) {
  const tipos = ["temperatura", "humedad", "ruido", "co2"];
  const ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
  db.registros.insertOne({
    sensor_id: `sensor${i}`,
    tipo: tipo,
    valor: Math.random() * 100,
    unidad: tipo === "temperatura" ? "°C" : tipo === "co2" ? "ppm" : "%",
    timestamp: new Date(),
    ciudad: ciudad
  });
}

/* Operaciones CRUD */
db.registros.find({ tipo: "temperatura" })
db.registros.updateOne({ sensor_id: "sensor5" }, { $set: { valor: 25.5 } })
db.registros.deleteOne({ sensor_id: "sensor100" })

/* Agregación por ciudad */
db.registros.aggregate([
  { $group: { _id: "$ciudad", avg_valor: { $avg: "$valor" }, total: { $sum: 1 } } }
])
