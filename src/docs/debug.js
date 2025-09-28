const fs = require('fs');
const filePath = '../src/blog/input/posts/2020-09-08-secure-asp-net-core-health-checks-to-a-specific-port.md';
const content = fs.readFileSync(filePath, 'utf8');
const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
const frontmatter = frontmatterMatch[1];

console.log('Raw frontmatter:');
console.log(JSON.stringify(frontmatter));
console.log('\nLines:');
const lines = frontmatter.split('\n');
lines.forEach((line, i) => console.log(i + ':', JSON.stringify(line)));
