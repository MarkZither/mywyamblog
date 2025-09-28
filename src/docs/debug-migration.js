const fs = require('fs');
const path = require('path');

// Run the actual migration script on a single file to debug
const sourceDir = 'C:\\Source\\github\\mywyamblog\\src\\blog\\input\\posts';
const destDir = 'C:\\Source\\github\\mywyamblog\\docs\\test-migration';
const specificFile = 'Setting-up-NetlifyCMS-with-Wyam---Part-1.md';

// Create destination directory
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy the actual functions from migrate-posts.js
function processContentPreservingCodeBlocks(content, transformer) {
    // Find all code blocks (triple backticks)
    const codeBlockRegex = /```[\s\S]*?```/g;
    const codeBlocks = [];
    let placeholderIndex = 0;
    
    // Replace code blocks with placeholders
    let processedContent = content.replace(codeBlockRegex, (match) => {
        const placeholder = `__CODE_BLOCK_PLACEHOLDER_${placeholderIndex}__`;
        codeBlocks[placeholderIndex] = match;
        placeholderIndex++;
        return placeholder;
    });
    
    // Apply transformations to content without code blocks
    processedContent = transformer(processedContent);
    
    // Restore code blocks
    codeBlocks.forEach((codeBlock, index) => {
        processedContent = processedContent.replace(`__CODE_BLOCK_PLACEHOLDER_${index}__`, codeBlock);
    });
    
    return processedContent;
}

function applyContentTransformations(content) {
    console.log('Starting transformation with content length:', content.length);
    
    let result = content;
    
    // Log initial image patterns
    const initialImages = result.match(/!\[.*?\]\([^)]+\)/g) || [];
    console.log('Initial images found:', initialImages.length);
    initialImages.slice(0, 3).forEach(img => console.log('  Initial:', img));
    
    // Apply transformations step by step
    result = result
        // Image path fixes (first)
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
        .replace(/(\!\[.*?\]\()\/assets\//g, '$1/img/');
    
    // Log after initial replacements
    const afterInitial = result.match(/!\[.*?\]\([^)]+\)/g) || [];
    console.log('After initial replacements:', afterInitial.length);
    afterInitial.slice(0, 3).forEach(img => console.log('  After initial:', img));
    
    result = result
        // HTML src/href attributes
        .replace(/(src=["'])\.\.\/assets\/Images\//g, '$1/img/')
        .replace(/(src=["'])\.\.\/assets\/images\//g, '$1/img/')
        .replace(/(src=["'])\.\.\/assets\//g, '$1/img/')
        .replace(/(src=["'])\/assets\/Images\//g, '$1/img/')
        .replace(/(src=["'])\/assets\/images\//g, '$1/img/')
        .replace(/(src=["'])\/assets\//g, '$1/img/')
        .replace(/(href=["'])\.\.\/assets\//g, '$1/img/')
        .replace(/(href=["'])\/assets\//g, '$1/img/')
        
        // Handle URL encoded spaces and special characters in image paths
        .replace(/(\!\[.*?\]\([^)]*?)%20/g, '$1 ')
        .replace(/(\!\[.*?\]\([^)]*?)%2520/g, '$1 ')
        
        // Fix backslashes in Windows-style paths
        .replace(/(\!\[.*?\]\(\/img\/[^)]*?)\\([^)]*?\))/g, '$1/$2');
    
    // Log after secondary replacements
    const afterSecondary = result.match(/!\[.*?\]\([^)]+\)/g) || [];
    console.log('After secondary replacements:', afterSecondary.length);
    afterSecondary.slice(0, 3).forEach(img => console.log('  After secondary:', img));
    
    return result;
}

// Read and process the file
const sourceFile = path.join(sourceDir, specificFile);
const destFile = path.join(destDir, specificFile);

console.log('Processing:', sourceFile);
const content = fs.readFileSync(sourceFile, 'utf8');

const transformedContent = processContentPreservingCodeBlocks(content, applyContentTransformations);

// Write result
fs.writeFileSync(destFile, transformedContent);

// Check final images
const finalImages = transformedContent.match(/!\[.*?\]\([^)]+\)/g) || [];
console.log('Final images:', finalImages.length);
finalImages.forEach(img => console.log('  Final:', img));

console.log('File written to:', destFile);