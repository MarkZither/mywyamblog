// Debug test for Bootstrap class removal issue
const originalContent = `![](../assets/Images/NetlifyCMS_Validation.PNG){.img-responsive .img-fluid}`;

console.log('Original:', originalContent);

// Test the Bootstrap class removal patterns from the migration script
let result1 = originalContent.replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ');
console.log('After pattern 1:', result1);

let result2 = originalContent.replace(/\s*\{\s*\.[\w\s\-\.]+\s*\}\s*/g, ' ');
console.log('After pattern 2:', result2);

let result3 = originalContent.replace(/\s*\{[\w\s\-\.]+\}\s*/g, ' ');
console.log('After pattern 3:', result3);

// Test what happens if we apply the patterns in the wrong order
let badOrder = originalContent;
console.log('\n--- Testing bad order ---');

// Bootstrap class removal FIRST (this might be the problem)
badOrder = badOrder.replace(/\s*\{\.[\w\s\-\.]+\}\s*/g, ' ');
console.log('After Bootstrap removal first:', badOrder);

// Then try image path replacement
badOrder = badOrder.replace(/(\!\[\]\()\.\.\/assets\/Images\//g, '$1/img/');
console.log('After image path replacement:', badOrder);

// Test the complete broken scenario that might be happening
console.log('\n--- Testing complete broken scenario ---');
let brokenScenario = originalContent;

// What if there's a pattern that's removing too much?
brokenScenario = brokenScenario.replace(/\.\.\//g, '');
console.log('After removing ../ completely:', brokenScenario);

brokenScenario = brokenScenario.replace(/assets\/Images\//g, '');
console.log('After removing assets/Images/:', brokenScenario);

brokenScenario = brokenScenario.replace(/\{.*?\}/g, '');
console.log('After removing {anything}:', brokenScenario);