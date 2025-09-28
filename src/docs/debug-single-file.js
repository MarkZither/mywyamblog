const fs = require('fs');
const path = require('path');

// Read the specific source file
const sourceFile = 'C:\\Source\\github\\mywyamblog\\src\\blog\\input\\posts\\Setting-up-NetlifyCMS-with-Wyam---Part-1.md';
const content = fs.readFileSync(sourceFile, 'utf8');

console.log('=== Original Content (first 2000 chars) ===');
console.log(content.substring(0, 2000));

// Apply just the processContentPreservingCodeBlocks function from migrate-posts.js
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

// Apply the applyContentTransformations function (simplified version)
function applyContentTransformations(content) {
    return content
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
        .replace(/(\!\[.*?\]\()\/assets\//g, '$1/img/')
        
        // Bootstrap class removal (later)
        .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
        .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
        .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
}

// Test the transformation
const transformed = processContentPreservingCodeBlocks(content, applyContentTransformations);

console.log('\n=== After Transformation (first 2000 chars) ===');
console.log(transformed.substring(0, 2000));

// Look specifically for image patterns
console.log('\n=== Image Patterns in Original ===');
const originalImages = content.match(/!\[.*?\]\([^)]+\)/g) || [];
originalImages.forEach(img => console.log(img));

console.log('\n=== Image Patterns in Transformed ===');
const transformedImages = transformed.match(/!\[.*?\]\([^)]+\)/g) || [];
transformedImages.forEach(img => console.log(img));