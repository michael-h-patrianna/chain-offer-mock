import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const htmlPath = 'html/single.html';
const imagesDir = 'html/images';

if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found');
    process.exit(1);
}

let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.bin'));

let replacements = 0;

console.log(`Found ${files.length} .bin files to check.`);

for (const file of files) {
    const filePath = path.join(imagesDir, file);
    // Get file type using 'file' command. -b for brief (no filename in output)
    let typeOutput = '';
    try {
        typeOutput = execSync(`file -b "${filePath}"`).toString().trim();
    } catch (e) {
        console.error(`Error checking file ${file}:`, e);
        continue;
    }
    
    let ext = null;
    if (typeOutput.includes('SVG')) ext = 'svg';
    else if (typeOutput.includes('PNG')) ext = 'png';
    else if (typeOutput.includes('JPEG')) ext = 'jpg';
    else if (typeOutput.includes('GIF')) ext = 'gif';
    else if (typeOutput.includes('Web/P')) ext = 'webp';
    else if (typeOutput.includes('AVIF')) ext = 'avif';
    
    if (ext) {
        const newFilename = file.replace('.bin', `.${ext}`);
        const newFilePath = path.join(imagesDir, newFilename);
        
        // Rename file
        fs.renameSync(filePath, newFilePath);
        
        // Update HTML
        const oldRef = `images/${file}`;
        const newRef = `images/${newFilename}`;
        
        // Replace all occurrences
        const parts = htmlContent.split(oldRef);
        if (parts.length > 1) {
             htmlContent = parts.join(newRef);
             // replacements count is number of files fixed, not number of replacements in HTML (which might be higher)
        }
        
        replacements++;
        console.log(`Fixed ${file} -> ${newFilename} (${typeOutput})`);
    } else {
        console.log(`Could not determine type for ${file}: ${typeOutput}`);
    }
}

fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log(`Updated HTML with ${replacements} file extension fixes.`);
