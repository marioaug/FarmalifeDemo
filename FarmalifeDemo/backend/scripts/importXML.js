// Script que importa XML a SQLite
// scripts/importXML.js
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const xml2js = require("xml2js");

// Archivo XML de origen
const xmlFile = "farmalife_sample_data.xml";

// Base de datos
const db = new sqlite3.Database("products.db");

// Función principal
async function importXML() {
  try {
    const xmlData = fs.readFileSync(xmlFile, "utf-8");

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    // Ajustá esta parte según la estructura del XML
    const items = result.products?.product || [];

    if (items.length === 0) {
      console.log("⚠️ No se encontraron productos en el XML.");
      return;
    }

    db.serialize(() => {
      const stmt = db.prepare("INSERT INTO products (nombre, precio) VALUES (?, ?)");

      items.slice(0, 50).forEach((item) => {
        const nombre = item.name?.[0] || "Producto sin nombre";
        const precio = parseFloat(item.price?.[0]) || 0;
        stmt.run(nombre, precio);
      });

      stmt.finalize();
      console.log(`✅ Se importaron ${Math.min(items.length, 50)} productos.`);
    });

  } catch (err) {
    console.error("❌ Error al procesar XML:", err.message);
  } finally {
    db.close();
  }
}

importXML();
