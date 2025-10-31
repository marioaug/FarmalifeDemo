// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas usando la variable del .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Definir el esquema y modelo
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  barcode: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema, 'products');

// Endpoint principal
app.get('/products', async (req, res) => {
  try {
    const { barcode } = req.query;
    const products = barcode
      ? await Product.find({ barcode })
      : await Product.find();

    res.json(products);
  } catch (error) {
    console.error('❌ Error al consultar MongoDB:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌍 Servidor corriendo en http://localhost:${PORT}`);
});
