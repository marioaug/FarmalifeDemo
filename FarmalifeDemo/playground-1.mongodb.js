/* global use, db */
// Selecciona la base de datos "" (la crea si no existe)

use('farmalife');

// Carga el JSON local (reemplazá la ruta exacta a tu archivo)
const filePath = 'C:/Users/mballester/Downloads/FarmalifeDemo/FarmalifeDemo/backend/products.json';

// Lee el archivo
const jsonData = cat(filePath);
const products = JSON.parse(jsonData);

// Inserta los datos
db.products.insertMany(products);

print(`✅ ${products.length} productos insertados correctamente en la colección "products".`);