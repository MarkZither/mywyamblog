const fs = require('fs');

// Copy the exact processContentPreservingCodeBlocks and applyContentTransformations from the migration script
// (This is the nuclear approach - copy the exact functions)

const testContent = `![](../assets/Images/NetlifyCMS_Validation.PNG){.img-responsive .img-fluid}`;
console.log('Original test content:', testContent);

// Now let me try something different - what if the issue is in how the full content is processed?
// Let me try processing a larger piece of content that includes the image

const largerTestContent = `
# Test Section

This is some text before the image.

![](../assets/Images/NetlifyCMS_Validation.PNG){.img-responsive .img-fluid}

This is some text after the image.

Another paragraph here.

![](../assets/Images/Another_Image.PNG){.img-responsive .img-fluid}

End of test.
`;

console.log('Testing with larger content...');

// Let me try to reproduce the issue with a different approach
// What if there's something about the order of operations or context that matters?

function processContentPreservingCodeBlocks(content, transformer) {
    // Find all code blocks (triple backticks)
    const codeBlockRegex = /```[\s\S]*?```/g;
    const codeBlocks = [];
    let placeholderIndex = 0;
    
    // Replace code blocks with placeholders
    let processedContent = content.replace(codeBlockRegex, (match) => {
        const placeholder = `__CODEBLOCK_PLACEHOLDER_${placeholderIndex}__`;
        codeBlocks[placeholderIndex] = match;
        placeholderIndex++;
        return placeholder;
    });
    
    // Apply transformations to content without code blocks
    processedContent = transformer(processedContent);
    
    // Restore code blocks
    codeBlocks.forEach((codeBlock, index) => {
        processedContent = processedContent.replace(`__CODEBLOCK_PLACEHOLDER_${index}__`, codeBlock);
    });
    
    return processedContent;
}

function applyContentTransformations(content) {
    let step = 0;
    const debug = (msg, result) => {
        console.log(`Step ${++step}: ${msg}`);
        if (result.includes('![](')) {
            const images = result.match(/!\[.*?\]\([^)]+\)/g) || [];
            images.forEach(img => console.log(`  Image found: ${img}`));
        }
    };
    
    let result = content;
    debug('Starting', result);
    
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
    
    debug('After initial image replacements', result);
    
    // Continue with the rest of the transformations...
    // Bootstrap class removal
    result = result
        .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
        .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
        .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
    
    debug('After Bootstrap class removal', result);
    
    return result;
}

const transformed = processContentPreservingCodeBlocks(largerTestContent, applyContentTransformations);
console.log('\nFinal result:');
console.log(transformed);

// Check for any imgXXX patterns
const imgPatterns = transformed.match(/!\[.*?\]\(img[^)]+\)/g) || [];
if (imgPatterns.length > 0) {
    console.log('\n❌ Found problematic imgXXX patterns:');
    imgPatterns.forEach(pattern => console.log(`  ${pattern}`));
} else {
    console.log('\n✅ No problematic imgXXX patterns found');
}

// Check for correct patterns
const correctPatterns = transformed.match(/!\[.*?\]\(\/img\/[^)]+\)/g) || [];
console.log(`\n✅ Found ${correctPatterns.length} correct /img/ patterns:`);