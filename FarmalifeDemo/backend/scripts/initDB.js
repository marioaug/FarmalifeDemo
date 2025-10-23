// scripts/initDB.js
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const xml2js = require('xml2js');

const dbFile = './products.db';
const xmlFile = './farmalife_sample_data.xml';

// Eliminar DB existente
if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
    console.log("Base de datos existente eliminada.");
}

const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    // Crear tabla con columna price
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        barcode TEXT,
        price REAL
    )`);

    // Leer XML
    const xml = fs.readFileSync(xmlFile, 'utf-8');

    xml2js.parseString(xml, (err, result) => {
        if (err) throw err;

        const products = result.products.product;

        const stmt = db.prepare("INSERT INTO products (name, barcode, price) VALUES (?, ?, ?)");

        products.forEach(p => {
            // Parsear precio a número
            const price = parseFloat(p.price[0]);
            stmt.run(p.name[0], p.barcode[0], price);
        });

        stmt.finalize(err => {
            if (err) throw err;
            console.log("Productos con precios importados correctamente.");
            db.close();
        });
    });
});
