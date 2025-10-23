const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Habilitar CORS
app.use(cors());

const db = new sqlite3.Database('./products.db');

// Endpoint con soporte de búsqueda por código de barras
app.get('/products', (req, res) => {
    const { barcode } = req.query; // capturamos el query param
    let query = "SELECT * FROM products";
    const params = [];

    if (barcode) {
        query += " WHERE barcode = ?"; // filtramos por código de barras
        params.push(barcode);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
