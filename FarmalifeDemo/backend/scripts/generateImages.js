import fs from "fs";
import path from "path";
import xml2js from "xml2js";
import archiver from "archiver";
import sharp from "sharp";

// --- CONFIGURACIÓN ---
const xmlFilePath = "./farmalife_sample_data.xml";
const outputDir = "./temp_images";
const zipOutputPath = "./farmalife_product_images.zip";

// Colores base para diferenciar productos
const COLORS = [
  "#F9E79F", "#AED6F1", "#A9DFBF", "#F5B7B1", "#D7BDE2",
  "#FAD7A0", "#F5CBA7", "#D6EAF8", "#ABEBC6", "#F1948A",
  "#E8DAEF", "#D5F5E3", "#FCF3CF", "#E6B0AA", "#D4E6F1",
  "#F9E79F", "#82E0AA", "#BB8FCE", "#FDEBD0", "#AED6F1",
  "#A2D9CE", "#FADBD8", "#D7BDE2", "#EDBB99", "#A9CCE3",
  "#F9E79F", "#CCD1D1", "#E6B0AA", "#AED6F1", "#F8C471"
];

// Crear carpeta temporal
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generar color aleatorio
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Crear una imagen simple con fondo de color y texto del nombre del producto
async function createPlaceholderImage(name, filePath) {
  const bgColor = getRandomColor();
  const svgText = `
    <svg width="600" height="600">
      <rect width="600" height="600" fill="${bgColor}"/>
      <text x="50%" y="50%" font-size="28" font-family="Arial"
        text-anchor="middle" fill="#000000" dy=".3em">${name}</text>
    </svg>
  `;

  await sharp(Buffer.from(svgText)).png().toFile(filePath);
}

// Generar imágenes y empaquetar en ZIP
async function generateImages() {
  console.log("🧴 Generando y agregando imágenes locales al ZIP...");

  const xml = fs.readFileSync(xmlFilePath, "utf8");
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  const products = result.products.product;

  const output = fs.createWriteStream(zipOutputPath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(output);

  for (const item of products) {
    const name = item.name[0];
    const safeName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".png";
    const filePath = path.join(outputDir, safeName);

    console.log(`🖼️  Creando imagen de ${name}...`);
    await createPlaceholderImage(name, filePath);
    archive.file(filePath, { name: safeName });
  }

  await archive.finalize();
  console.log(`📦 ZIP creado: ${zipOutputPath}`);
  console.log("🎉 Proceso completo (modo local sin API).");
}

generateImages().catch(err => console.error("❌ Error:", err));
