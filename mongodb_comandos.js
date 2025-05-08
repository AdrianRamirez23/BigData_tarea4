// Inserción masiva
for (let i = 1; i <= 100; i++) {
  const tipos = ["temperatura", "humedad", "ruido", "co2"];
  const ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
  db.registros.insertOne({
    sensor_id: `SEN-00${i}`,
    tipo: tipo,
    valor: Math.random() * 100,
    unidad: tipo === "temperatura" ? "C" : tipo === "co2" ? "ppm" : "%",
    timestamp: new Date(),
    ciudad: ciudad
  });
}
// Consultas básicas
// 1. Selección
> db.registros.find({ tipo: "temperatura" })
// 2. Actualización
> db.registros.updateOne({ sensor_id: "SEN-005 }, { $set: { valor: 25.5 } })
// 3. Eliminación
> db.registros.deleteOne({ sensor_id: "SEN-100" })

// 4. Agregación
db.registros.aggregate([
  {
    $group: {
      _id: "$ubicacion.ciudad",
      avg_valor: { $avg: "$valor" },
      total: { $sum: 1 }
    }
  }
])])
