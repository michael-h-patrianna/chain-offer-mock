import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const htmlPath = 'html/single.html';
const imagesDir = 'html/images';

// Ensure paths are relative to CWD or script location. 
// Assuming script is run from project root as per instructions.

if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found:', htmlPath);
  process.exit(1);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Reading HTML file...');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Regex to find data URIs
// Group 1: Mime type (e.g., image/png, image/svg+xml)
// Group 2: Base64 data
const regex = /data:image\/([a-zA-Z0-9+.-]+);base64,([a-zA-Z0-9+/=]+)/g;

let count = 0;
let savedCount = 0;

const newHtmlContent = htmlContent.replace(regex, (match, mimeType, base64Data) => {
  count++;
  
  // Determine extension
  let ext = 'bin';
  if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') ext = 'jpg';
  else if (mimeType === 'image/png') ext = 'png';
  else if (mimeType === 'image/gif') ext = 'gif';
  else if (mimeType === 'image/svg+xml') ext = 'svg';
  else if (mimeType === 'image/webp') ext = 'webp';
  else if (mimeType === 'image/x-icon') ext = 'ico';
  
  // Create buffer
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Calculate hash for filename to dedup
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  const filename = `${hash}.${ext}`;
  const filePath = path.join(imagesDir, filename);
  const relativePath = `images/${filename}`;

  // Save file if not exists
  if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, buffer);
      savedCount++;
  }
  
  return relativePath;
});

console.log(`Found ${count} base64 images.`);
console.log(`Saved ${savedCount} unique new images to ${imagesDir}.`);

fs.writeFileSync(htmlPath, newHtmlContent, 'utf-8');
console.log('Updated HTML file.');
