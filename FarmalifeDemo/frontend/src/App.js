import { useState } from 'react';
import './App.css'; // CSS con animaciones y estilo

// Función para mapear el nombre del producto (del XML) al nombre del archivo de imagen (en public/products_images)
const getImageUrl = (productName) => {
 if (!productName) return '';
 
 // 1. Limpieza estándar: minúsculas, reemplazar espacios con guiones
 let cleanName = productName
 .toLowerCase()
 .replace(/ /g, '-')
 .replace(/[^\w-]/g, ''); 
 
 // 2. Manejo de casos especiales o inconsistencias en nombres de archivo
 // Se mantienen las reglas de mapeo que ya definimos
 if (productName.includes('Vitamina C')) {
 cleanName = 'vitaminac-1000mg';
 } else if (productName.includes('Perfume Floral')) {
 cleanName = 'perfume-floral-50ml';
 } else if (productName.includes('FPS50')) {
 cleanName = 'protector-solar-fps50-100ml'; 
 } else if (productName.includes('FPS30')) {
 cleanName = 'crema-solar-fps30-120ml';
 } else if (productName.includes('Vitamina B12')) {
 cleanName = 'vitamina-b12-x30';
 } else if (productName.includes('Omega 3')) {
 cleanName = 'suplemento-omega-3-x60';
 }


 // 3. Devuelve la ruta completa a la carpeta en 'public'
 return `/products_images/${cleanName}.png`; 
};

export default function App() {
 const [barcode, setBarcode] = useState('');
 const [foundProduct, setFoundProduct] = useState(null);
 const [history, setHistory] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const handleSearch = async () => {
 if (!barcode) return;

 setLoading(true);
 setError(null);

 try {
 // Nota: Esta llamada asume que el backend tiene un endpoint /products que filtra por barcode
 const res = await fetch(`http://localhost:5000/products?barcode=${barcode}`);
 if (!res.ok) throw new Error('Producto no encontrado (Error de conexión o servidor)');

 const data = await res.json();

 if (data.length === 0) {
 setFoundProduct(null);
 setError('Producto no encontrado');
 } else {
 setFoundProduct(data[0]);
 // Añade al historial, asegurando que no haya duplicados y limitando a 5
 setHistory(prev => [data[0], ...prev.filter(p => p.barcode !== data[0].barcode)].slice(0, 5));
 }
 } catch (err) {
 setFoundProduct(null);
 setError(`Error al buscar: ${err.message}`);
 } finally {
 setLoading(false);
 setBarcode('');
 }
 };

 return (
 <div className="app-container">
 {/* Logo y título */}
 <div className="header">
 <img src="/logo.png" alt="Farmacia Logo" className="logo" />
 <h1>Buscador de Precios - Farmacia</h1>
 </div>

 {/* Input y botón */}
 <div className="search-bar">
 <input
 type="text"
 placeholder="Ingrese o escanee código de barras"
 value={barcode}
 onChange={e => setBarcode(e.target.value)}
 onKeyDown={(e) => { // Permite buscar con Enter
 if (e.key === 'Enter') {
 handleSearch();
 }
 }}
 />
 <button onClick={handleSearch}>Buscar</button>
 </div>

 {/* Spinner */}
 {loading && (
 <div className="spinner-container">
 <div className="spinner"></div>
 <p>Buscando producto...</p>
 </div>
 )}

 {/* Producto encontrado - Estilo Vertical (Imagen arriba) */}
 {!loading && foundProduct && (
 <div className="fade-in product-card"> {/* SOLO product-card, sin product-card-horizontal */}
 
 {/* IMAGEN: Directamente en el contenedor */}
 <img 
 src={getImageUrl(foundProduct.name)} 
 alt={foundProduct.name} 
 className="product-image-miniatura-centered" /* Clase para la miniatura centrada */
 />

 {/* TEXTO */}
 <h2>{foundProduct.name}</h2>
 <p><strong>Código de barras:</strong> {foundProduct.barcode}</p>
 <p className="price"><strong>Precio:</strong> ${foundProduct.price}</p>
 </div>
 )}

 {/* Error */}
 {!loading && error && <p className="error">{error}</p>}

 {/* Historial */}
 {history.length > 0 && (
 <div className="history">
 <h3>Últimos productos buscados</h3>
 <ul>
 {history.map(p => (
 <li key={p.barcode}>
 {p.name} - ${p.price}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 );
}