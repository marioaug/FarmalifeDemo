# 🧴 Farmalife Demo

### Catálogo de productos con imágenes, base de datos y XML

---

## 📖 Descripción

**Farmalife Demo** es un proyecto de demostración que muestra un catálogo de productos (como cremas, shampoos, etc.) con su **nombre, precio, código de barras e imagen**.  
Los datos se obtienen desde una **base de datos local** y un **archivo XML**, mientras que las imágenes se cargan dinámicamente desde una carpeta local servida por un servidor Node.js en `http://localhost:3000`.

Su objetivo principal es ilustrar cómo integrar distintas fuentes de datos (XML, DB e imágenes locales) en una aplicación ligera y funcional.

---

## ⚙️ Tecnologías utilizadas

| Área | Tecnología / Herramienta | Descripción |
|------|----------------------------|--------------|
| 💻 Backend | **Node.js** + **Express.js** | Servidor para servir las imágenes y manejar la lógica |
| 🗄️ Base de datos | SQLite / MySQL (según configuración) | Almacena nombre, precio y código de barras |
| 🧾 Datos estructurados | XML | Define el listado de productos y metadatos |
| 🖼️ Archivos estáticos | Servidor Express | Carga las imágenes desde la carpeta `/images` |
| 🧰 Control de versiones | Git + GitHub | Control del código fuente |
| 🌐 Visualización | HTML / React / JavaScript | Interfaz para mostrar los productos |

---

## 🚀 Instalación y ejecución local

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/marioaug/FarmalifeDemo.git
```

### 2️⃣ Ingresar al directorio del proyecto
```bash
cd FarmalifeDemo/FarmalifeDemo
```

### 3️⃣ Instalar dependencias
Ejecuta el siguiente comando para instalar las librerías necesarias (según tu `package.json`):
```bash
npm install
```

### 4️⃣ Verificar estructura de carpetas
Asegúrate de tener las siguientes carpetas y archivos:

```
FarmalifeDemo/
│
├─ images/                    ← Carpeta con imágenes de productos
│    ├─ CremaHidratante.png
│    ├─ ShampooAntiCaspa.png
│    └─ ...
│
├─ xml/                       ← Archivo(s) XML con datos de productos
│    └─ productos.xml
│
├─ db/                        ← Base de datos local (SQLite o similar)
│    └─ productos.db
│
├─ register-shim.js           ← Archivo auxiliar para compatibilidad
├─ package.json               ← Dependencias y scripts
├─ server.js                  ← Servidor Express (punto de entrada)
└─ README.md                  ← Este documento
```

### 5️⃣ Iniciar el servidor local
```bash
npm start
```

Si configuraste el script `"start"` en tu `package.json`, esto iniciará tu aplicación en:
```
http://localhost:3000
```

### 6️⃣ Ver los productos
Abre tu navegador y deberías ver una interfaz o listado con los productos y sus imágenes redimensionadas (por ejemplo 150×150 px).

---

## 🧩 Integración de datos

El proyecto combina **tres fuentes principales de información**:

1. **XML**  
   Define los productos base, por ejemplo:
   ```xml
   <product>
       <name>Crema Hidratante Facial 50ml</name>
       <barcode>7790000000011</barcode>
       <price>9500.00</price>
   </product>
   ```
   Estos datos se transforman en objetos JSON con ayuda de librerías como `xml2js`.

2. **Base de datos**  
   Puede ser SQLite o MySQL. Almacena datos más dinámicos (precios, stock, etc.).

3. **Carpeta de imágenes**  
   Contiene las imágenes locales vinculadas a los productos.  
   Para evitar errores, el nombre del archivo debe coincidir con el producto o código de barras, por ejemplo:
   ```
   7790000000011.png
   7790000000012.png
   ```

---

## 🖼️ Ejemplo de visualización

Cada producto se muestra con:
- Imagen redimensionada
- Nombre descriptivo
- Precio actualizado
- Código de barras (opcional o como tooltip)

Ejemplo visual:

| Imagen | Producto | Precio |
|:-------|:----------|:-------|
| 🧴 | Crema Hidratante Facial 50ml | $9.500 |
| 🧴 | Shampoo Anti-Caspa 200ml | $7.300 |

---

## 🧠 Recomendaciones técnicas

- Mantener los nombres de archivos sin espacios ni caracteres especiales.  
- Usar una estructura de carpetas limpia y predecible.  
- Si usas React, implementa un componente `<ProductCard>` reutilizable para cada producto.  
- Si usas Express puro, asegúrate de servir estáticos correctamente con:
  ```js
  app.use('/images', express.static('images'));
  ```
- Utiliza variables de entorno (`.env`) para configurar puertos, rutas o credenciales de DB.

---

## 🧠 Integración con hardware

- El proyecto Farmalife Demo está diseñado pensando en una futura integración física mediante una Raspberry Pi.
  Esto permitirá convertir la aplicación en un visor táctil de productos, con conexión a un lector de código de barras para búsqueda instantánea de artículos.

- 🔧 Componentes sugeridos:

- Raspberry Pi 4 (o superior)

- Pantalla táctil de 7" (oficial o compatible por HDMI)

- Lector de código de barras USB o Bluetooth

- Servidor local Node.js ejecutándose en la Raspberry

## 📲 Funcionamiento esperado:

- El usuario escanea un producto → la app muestra su información, imagen y precio en tiempo real.

- También puede navegar por el catálogo táctilmente.

- Ideal para mostradores, puntos de venta o consultas rápidas en farmacias.

## 💡 Posibles mejoras futuras

- Integrar una API REST para gestionar productos.  
- Agregar panel administrativo para actualizar precios.  
- Sincronizar los productos automáticamente entre XML y base de datos.  
- Permitir carga de imágenes desde interfaz web.  
- Publicar el proyecto con **Vercel**, **Render**, o **Railway**.
- Correr el sistema completo en Raspberry Pi con pantalla y escáner integrados.

---

## 👤 Autor

**Mario Ballester**  
📧 Contacto: [GitHub @marioaug](https://github.com/marioaug)  
💼 Desarrollador / Integrador de automatizaciones y sistemas retail  

---

## 📜 Licencia

Este proyecto se distribuye bajo licencia libre para demostraciones y usos no comerciales.  
Puedes modificarlo o adaptarlo libremente, citando la fuente original.
