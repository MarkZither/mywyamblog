const fs = require('fs');
const path = require('path');

// Minimal migration script to test just the image path fixes
const sourceDir = 'C:\\Source\\github\\mywyamblog\\src\\blog\\input\\posts';
const destDir = 'C:\\Source\\github\\mywyamblog\\docs\\test-minimal';

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function fixImagePaths(content) {
    return content
        // Image path fixes ONLY
        .replace(/(\!\[\]\()\.\.\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[\]\()\.\.\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[\]\()\.\.\/assets\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[\]\()\/assets\//g, '$1/img/')
        
        // Handle images with alt text
        .replace(/(\!\[.*?\]\()\.\.\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\.\.\/assets\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\/Images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\/images\//g, '$1/img/')
        .replace(/(\!\[.*?\]\()\/assets\//g, '$1/img/')
        
        // Remove Bootstrap classes
        .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
        .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
        .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
}

// Test on the specific problematic file
const testFile = 'Setting-up-NetlifyCMS-with-Wyam---Part-1.md';
const sourceFile = path.join(sourceDir, testFile);
const destFile = path.join(destDir, testFile);

console.log('Testing minimal image path fix on:', testFile);

const content = fs.readFileSync(sourceFile, 'utf8');
console.log('Original content length:', content.length);

// Find original images
const originalImages = content.match(/!\[.*?\]\([^)]+\)/g) || [];
console.log('Original images found:', originalImages.length);
originalImages.slice(0, 5).forEach(img => console.log('  Original:', img));

// Apply fix
const fixedContent = fixImagePaths(content);

// Find fixed images  
const fixedImages = fixedContent.match(/!\[.*?\]\([^)]+\)/g) || [];
console.log('Fixed images found:', fixedImages.length);
fixedImages.slice(0, 5).forEach(img => console.log('  Fixed:', img));

// Check for problematic patterns
const problematicImages = fixedContent.match(/!\[.*?\]\(img[^\/][^)]*\)/g) || [];
if (problematicImages.length > 0) {
    console.log('❌ Found problematic patterns:');
    problematicImages.forEach(img => console.log('  Problem:', img));
} else {
    console.log('✅ No problematic patterns found');
}

// Write result
fs.writeFileSync(destFile, fixedContent);
console.log('Result written to:', destFile);