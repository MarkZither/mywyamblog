const fs = require('fs');

// Comprehensive debug of every transformation step
const testImage = `![](../assets/Images/NetlifyCMS_Validation.PNG){.img-responsive .img-fluid}`;
console.log('Starting with:', testImage);

let result = testImage;

// Step 1: Initial image path replacements
const step1Before = result;
result = result
    .replace(/(\!\[\]\()\.\.\/assets\/Images\//g, '$1/img/')
    .replace(/(\!\[\]\()\.\.\/assets\/images\//g, '$1/img/')
    .replace(/(\!\[\]\()\.\.\/assets\//g, '$1/img/')
    .replace(/(\!\[\]\()\/assets\/Images\//g, '$1/img/')
    .replace(/(\!\[\]\()\/assets\/images\//g, '$1/img/')
    .replace(/(\!\[\]\()\/assets\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\/assets\/Images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\/assets\/images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\/assets\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\/assets\/Images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\/assets\/images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\/assets\//g, '$1/img/');
if (result !== step1Before) console.log('After step 1 (initial image paths):', result);

// Step 2: Windows-style paths
const step2Before = result;
result = result
    .replace(/(\!\[.*?\]\()\.\.\\assets\\Images\\/g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\\assets\\images\\/g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\\assets\\/g, '$1/img/');
if (result !== step2Before) console.log('After step 2 (Windows paths):', result);

// Step 3: Fix /img/Images to /img/
const step3Before = result;
result = result
    .replace(/(\!\[.*?\]\()\/img\/Images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\/img\/images\//g, '$1/img/');
if (result !== step3Before) console.log('After step 3 (fix /img/Images):', result);

// Step 4: Fix malformed paths
const step4Before = result;
result = result
    .replace(/(\!\[.*?\]\()img([^\/])/g, '$1/img/$2')
    .replace(/(\!\[.*?\]\()\/img([^\/])/g, '$1/img/$2');
if (result !== step4Before) console.log('After step 4 (fix malformed):', result);

// Step 5: Generic catch-all
const step5Before = result;
result = result
    .replace(/(\!\[.*?\]\()([^\/][^)]*?\.(png|jpg|jpeg|gif|svg))/gi, '$1/img/$2');
if (result !== step5Before) console.log('After step 5 (generic catch-all):', result);

// Step 6: Specific imgXXX patterns
const step6Before = result;
result = result
    .replace(/(\!\[.*?\]\()img([A-Za-z0-9_\-\.]*?\.(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))/g, '$1/img/$2')
    .replace(/!\[\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![](/img/$1)')
    .replace(/!\[([^\]]*)\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![$1](/img/$2)');
if (result !== step6Before) console.log('After step 6 (imgXXX patterns):', result);

// Step 7: HTML attributes
const step7Before = result;
result = result
    .replace(/(src=["'])\.\.\/assets\/Images\//g, '$1/img/')
    .replace(/(src=["'])\.\.\/assets\/images\//g, '$1/img/')
    .replace(/(src=["'])\.\.\/assets\//g, '$1/img/')
    .replace(/(src=["'])\/assets\/Images\//g, '$1/img/')
    .replace(/(src=["'])\/assets\/images\//g, '$1/img/')
    .replace(/(src=["'])\/assets\//g, '$1/img/')
    .replace(/(href=["'])\.\.\/assets\//g, '$1/img/')
    .replace(/(href=["'])\/assets\//g, '$1/img/');
if (result !== step7Before) console.log('After step 7 (HTML attributes):', result);

// Step 8: URL encoded spaces
const step8Before = result;
result = result
    .replace(/(\!\[.*?\]\([^)]*?)%20/g, '$1 ')
    .replace(/(\!\[.*?\]\([^)]*?)%2520/g, '$1 ');
if (result !== step8Before) console.log('After step 8 (URL encoded):', result);

// Step 9: Backslashes
const step9Before = result;
result = result
    .replace(/(\!\[.*?\]\(\/img\/[^)]*?)\\([^)]*?\))/g, '$1/$2');
if (result !== step9Before) console.log('After step 9 (backslashes):', result);

// Step 10: Bootstrap class removal
const step10Before = result;
result = result
    .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
    .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
    .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
if (result !== step10Before) console.log('After step 10 (Bootstrap removal):', result);

console.log('Final result:', result);

// Now test what patterns from the migration script might be interfering
console.log('\n=== Testing potential interfering patterns ===');

// Test some patterns that might be stripping paths
let testResult = `![](/img/NetlifyCMS_Validation.PNG)`;
console.log('Testing with correct image:', testResult);

// Test if any of the curly brace or other patterns might be interfering
testResult = testResult.replace(/\{.*?\}/g, '');
console.log('After removing any curly braces:', testResult);

testResult = testResult.replace(/\/[^\/]*\//g, '/');
console.log('After suspicious slash pattern:', testResult);

testResult = testResult.replace(/\/([^\/]+\/[^\/]+)/g, '$1');
console.log('After another suspicious pattern:', testResult);