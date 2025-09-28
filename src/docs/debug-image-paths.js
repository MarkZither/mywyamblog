// Debug test for image path transformation
const testContent = `![](../assets/Images/NetlifyCMS_Validation.PNG){.img-responsive .img-fluid}`;

console.log('Original:', testContent);

// Apply the transformations in the exact order from applyContentTransformations
let result = testContent;

// Step 1: Image path fixes (from the start of the function)
result = result
    .replace(/(\!\[\]\()\.\.\/assets\/Images\//g, '$1/img/')
    .replace(/(\!\[.*?\]\()\.\.\/assets\/Images\//g, '$1/img/');
console.log('After main path replacement:', result);

// Step 2: Bootstrap class removal (from later in the function)
result = result
    .replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ')
    .replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ')
    .replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
console.log('After class removal:', result);

// Check if there are any other patterns that might interfere
result = result
    .replace(/(\!\[.*?\]\()([^\/][^)]*?\.(png|jpg|jpeg|gif|svg))/gi, '$1/img/$2');
console.log('After generic catch-all pattern:', result);

// Test the direct patterns that should catch imgXXX
result = result
    .replace(/(\!\[.*?\]\()img([A-Za-z0-9_\-\.]*?\.(png|jpg|jpeg|gif|svg|PNG|JPG|JPEG|GIF|SVG))/g, '$1/img/$2')
    .replace(/!\[\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![](/img/$1)')
    .replace(/!\[([^\]]*)\]\(img([A-Za-z0-9_\-\.]+)\)/g, '![$1](/img/$2)');
console.log('After imgXXX patterns:', result);