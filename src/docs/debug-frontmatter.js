const fs = require('fs');

const filePath = '../src/blog/input/posts/Setting-Raspberry-Pi-NGINX-PHP-MySQL-LEMP-Stack.md';
const content = fs.readFileSync(filePath, 'utf8');

console.log('File length:', content.length);
console.log('First 200 characters:');
console.log(JSON.stringify(content.substring(0, 200)));

const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
console.log('Frontmatter match:', !!frontmatterMatch);

if (frontmatterMatch) {
    console.log('Frontmatter:', frontmatterMatch[1]);
} else {
    console.log('Testing alternative regex patterns...');
    const altMatch1 = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    console.log('Alt regex 1 (with \\r):', !!altMatch1);
    
    const altMatch2 = content.match(/^---[\s\r\n]*([\s\S]*?)[\s\r\n]*---[\s\r\n]*([\s\S]*)$/);
    console.log('Alt regex 2 (flexible whitespace):', !!altMatch2);
}